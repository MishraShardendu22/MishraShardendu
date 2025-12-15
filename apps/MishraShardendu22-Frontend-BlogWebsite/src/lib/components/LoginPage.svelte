<script lang="ts">
  import { toast } from "../toast";
  import { authStore } from "../auth";
  import Card from "./ui/card.svelte";
  import Input from "./ui/input.svelte";
  import Label from "./ui/label.svelte";
  import Button from "./ui/button.svelte";
  import { navigateTo } from "../navigation";
  import OTPVerification from "./OTPVerification.svelte";
  import { LogIn, Mail, Lock, User } from "lucide-svelte";
  import { validateEmail, validatePassword, validateName } from "../validation";

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let isLogin = $state(true);
  let nameError = $state("");
  let emailError = $state("");
  let profileImage = $state("");
  let passwordError = $state("");
  let isSubmitting = $state(false);
  let showOTPInput = $state(false);
  

  const validateForm = (): boolean => {
    let isValid = true;
    
    // Reset errors
    emailError = "";
    passwordError = "";
    nameError = "";

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      emailError = emailValidation.error || "";
      isValid = false;
    }

    // Validate password
    if (!isLogin || password) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        passwordError = passwordValidation.error || "";
        isValid = false;
      }
    }

    // Validate name (only for registration)
    if (!isLogin) {
      const nameValidation = validateName(name);
      if (!nameValidation.isValid) {
        nameError = nameValidation.error || "";
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    isSubmitting = true;

    try {
      if (isLogin) {
        const result = await authStore.login(email, password);
        if (result.success) {
          toast.success("Login successful!");
          setTimeout(() => {
            navigateTo("/blog/read");
          }, 500);
        } else {
          toast.error(result.error || "Login failed");
        }
      } else {
        const result = await authStore.register(email, password, name, profileImage || undefined);
        if (result.success) {
          showOTPInput = true;
          toast.success("Registration successful! Please verify your email.");
        } else {
          toast.error(result.error || "Registration failed");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      isSubmitting = false;
    }
  };

  const handleOTPSuccess = () => {
    toast.success("Email verified successfully!");
    setTimeout(() => {
      navigateTo("/blog/read");
    }, 500);
  };

  const handleOTPBack = () => {
    showOTPInput = false;
  };

  const toggleMode = () => {
    isLogin = !isLogin;
    emailError = "";
    passwordError = "";
    nameError = "";
    password = "";
    if (isLogin) {
      name = "";
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-background to-primary/5">
  {#if showOTPInput}
    <OTPVerification {email} onSuccess={handleOTPSuccess} onBack={handleOTPBack} />
  {:else}
    <Card class="w-full max-w-md p-8 space-y-6 shadow-2xl">
      <div class="text-center space-y-2">
        <div class="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <LogIn class="w-8 h-8 text-primary" />
        </div>
        <h1 class="text-3xl font-bold">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p class="text-muted-foreground">
          {isLogin ? "Log in to your blog account" : "Sign up to start blogging"}
        </p>
      </div>

      <form onsubmit={handleSubmit} class="space-y-4">
        {#if !isLogin}
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                bind:value={name}
                class="pl-10 {nameError ? 'border-destructive' : ''}"
                required
              />
            </div>
            {#if nameError}
              <p class="text-xs text-destructive">{nameError}</p>
            {/if}
          </div>

          <div class="space-y-2">
            <Label for="profileImage">Profile Image (optional)</Label>
            <div class="relative">
              <Input
                id="profileImage"
                type="url"
                placeholder="https://example.com/your-image.jpg"
                bind:value={profileImage}
                class="pl-3"
              />
            </div>
            <p class="text-xs text-muted-foreground">Add your Image or let Luck roll a Die !! (optional)</p>
          </div>
        {/if}

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              bind:value={email}
              class="pl-10 {emailError ? 'border-destructive' : ''}"
              required
            />
          </div>
          {#if emailError}
            <p class="text-xs text-destructive">{emailError}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              bind:value={password}
              class="pl-10 {passwordError ? 'border-destructive' : ''}"
              required
            />
          </div>
          {#if passwordError}
            <p class="text-xs text-destructive">{passwordError}</p>
          {:else if !isLogin}
            <p class="text-xs text-muted-foreground">
              Min 8 chars, with uppercase, lowercase, number & special character
            </p>
          {/if}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base font-semibold"
        >
          {isSubmitting ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
        </Button>
      </form>

      <div class="text-center">
        <button
          type="button"
          onclick={toggleMode}
          class="text-sm text-primary hover:underline"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>

      <div class="text-center">
        <a href="/blog/read" class="text-sm text-muted-foreground hover:text-primary">
          Continue as guest
        </a>
      </div>
    </Card>
  {/if}
</div>
