<script lang="ts">
  import Button from "./ui/button.svelte";
  import Input from "./ui/input.svelte";
  import Label from "./ui/label.svelte";
  import Card from "./ui/card.svelte";
  import { ShieldCheck, Mail, RefreshCw } from "lucide-svelte";
  import { authStore } from "../auth";
  import { toast } from "../toast";
  import { validateOTP } from "../validation";
  import { authApi } from "../api";
  import { navigateTo } from "../navigation";

  interface Props {
    email: string;
    onSuccess?: () => void;
    onBack?: () => void;
  }

  let { email, onSuccess, onBack }: Props = $props();

  let otp = $state("");
  let isSubmitting = $state(false);
  let isResending = $state(false);
  let resendCooldown = $state(0);

  // Start cooldown timer
  let cooldownInterval: number | null = null;

  const handleOTPInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    // Only allow numbers
    const cleaned = target.value.replace(/[^0-9]/g, '');
    otp = cleaned;
  };

  const startCooldown = () => {
    resendCooldown = 60; // 60 seconds cooldown
    
    if (cooldownInterval) {
      clearInterval(cooldownInterval);
    }

    cooldownInterval = setInterval(() => {
      resendCooldown -= 1;
      if (resendCooldown <= 0) {
        if (cooldownInterval) {
          clearInterval(cooldownInterval);
        }
        cooldownInterval = null;
      }
    }, 1000);
  };

  const handleVerifyOTP = async (e: Event) => {
    e.preventDefault();

    const validation = validateOTP(otp);
    if (!validation.isValid) {
      toast.error(validation.error || 'Invalid OTP');
      return;
    }

    isSubmitting = true;

    try {
      const result = await authStore.verifyOTP(email, otp.trim());
      
      if (result.success) {
        toast.success("Email verified successfully!");
        if (onSuccess) {
          onSuccess();
        } else {
          setTimeout(() => {
            navigateTo("/blog/read");
          }, 1000);
        }
      } else {
        toast.error(result.error || "OTP verification failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to verify OTP");
    } finally {
      isSubmitting = false;
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) {
      return;
    }

    isResending = true;

    try {
      const response = await authApi.resendOTP(email);
      
      if (response.success) {
        toast.success("OTP sent successfully! Please check your email.");
        startCooldown();
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP");
    } finally {
      isResending = false;
    }
  };

  // Cleanup on component destroy
  $effect(() => {
    return () => {
      if (cooldownInterval) {
        clearInterval(cooldownInterval);
      }
    };
  });
</script>

<Card class="w-full max-w-md p-8 space-y-6 shadow-2xl">
  <div class="text-center space-y-2">
    <div
      class="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
    >
      <ShieldCheck class="w-8 h-8 text-primary" />
    </div>
    <h2 class="text-2xl font-bold text-foreground">Verify Your Email</h2>
    <p class="text-muted-foreground text-sm">
      We've sent a 6-digit verification code to <strong>{email}</strong>
    </p>
  </div>

  <form onsubmit={handleVerifyOTP} class="space-y-6">
    <div class="space-y-2">
      <Label for="otp">Verification Code</Label>
      <input
        id="otp"
        type="text"
        inputmode="numeric"
        placeholder="000000"
        bind:value={otp}
        oninput={handleOTPInput}
        maxlength="6"
        pattern="[0-9]*"
        required
        disabled={isSubmitting}
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-center text-2xl tracking-widest font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p class="text-xs text-muted-foreground">
        Enter the 6-digit code from your email
      </p>
    </div>

    <Button
      type="submit"
      disabled={isSubmitting || otp.length !== 6}
      className="w-full h-12"
    >
      {isSubmitting ? "Verifying..." : "Verify Email"}
    </Button>
  </form>

  <div class="space-y-3">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t"></span>
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-card px-2 text-muted-foreground">Didn't receive code?</span>
      </div>
    </div>

    <Button
      type="button"
      variant="outline"
      onclick={handleResendOTP}
      disabled={isResending || resendCooldown > 0}
      className="w-full"
    >
      {#if isResending}
        <RefreshCw class="w-4 h-4 mr-2 animate-spin" />
        Sending...
      {:else if resendCooldown > 0}
        <Mail class="w-4 h-4 mr-2" />
        Resend in {resendCooldown}s
      {:else}
        <Mail class="w-4 h-4 mr-2" />
        Resend Code
      {/if}
    </Button>

    {#if onBack}
      <Button type="button" variant="ghost" onclick={onBack} className="w-full">
        Back to Registration
      </Button>
    {/if}
  </div>
</Card>
