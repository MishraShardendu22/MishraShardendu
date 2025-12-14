<script lang="ts">
  import { onDestroy } from "svelte";
  import Button from "./ui/button.svelte";
  import Input from "./ui/input.svelte";
  import { Mail, Check, X } from "lucide-svelte";
  import { authStore } from "../auth";
  import { toast } from "../toast";
  import { authApi } from "../api";

  let { email }: { email: string } = $props();

  let showOTPInput = $state(false);
  let otp = $state("");
  let isSubmitting = $state(false);
  let resendCooldown = $state(0);
  let cooldownInterval: number | null = null;

  // Cleanup on component destroy
  onDestroy(() => {
    if (cooldownInterval) {
      clearInterval(cooldownInterval);
    }
  });

  const startCooldown = () => {
    resendCooldown = 60;
    
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

  const handleSendOTP = async () => {
    if (resendCooldown > 0) return;

    isSubmitting = true;
    try {
      const response = await authApi.resendOTP(email);
      
      if (response.success) {
        toast.success("OTP sent to your email!");
        showOTPInput = true;
        startCooldown();
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      isSubmitting = false;
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    isSubmitting = true;
    try {
      const result = await authStore.verifyOTP(email, otp.trim());
      
      if (result.success) {
        toast.success("Email verified successfully!");
        showOTPInput = false;
        otp = "";
        
        // Update the user in the store
        const userResponse = await authApi.getCurrentUser();
        if (userResponse.success && userResponse.data) {
          authStore.updateUser(userResponse.data.user);
        }
      } else {
        toast.error(result.error || "Invalid OTP");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to verify OTP");
    } finally {
      isSubmitting = false;
    }
  };

  const handleOTPInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    // Only allow numbers
    const cleaned = target.value.replace(/[^0-9]/g, '');
    otp = cleaned;
  };

  const closeOTPInput = () => {
    showOTPInput = false;
    otp = "";
  };
</script>

<div class="space-y-2.5 w-full overflow-hidden">
  {#if showOTPInput}
    <!-- OTP Input Box -->
    <div class="relative p-3 bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800 rounded-lg backdrop-blur-sm w-full">
      <button
        onclick={closeOTPInput}
        class="absolute top-2 right-2 p-1 hover:bg-amber-200 dark:hover:bg-amber-900/60 rounded-md transition-colors z-10"
        title="Close"
        type="button"
      >
        <X class="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
      </button>
      
      <p class="text-[11px] font-bold uppercase tracking-wide text-amber-900 dark:text-amber-200 mb-2 pr-8">
        Enter 6-digit OTP
      </p>
      
      <div class="flex gap-2 w-full">
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="000000"
          bind:value={otp}
          oninput={handleOTPInput}
          maxlength="6"
          class="h-10 text-base flex-1 min-w-0 font-mono text-center tracking-widest bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-md px-2 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          autocomplete="off"
        />
        <Button
          size="sm"
          onclick={handleVerifyOTP}
          disabled={isSubmitting || otp.length !== 6}
          className="h-10 px-3 flex-shrink-0 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-md disabled:opacity-50"
          title="Verify"
          type="button"
        >
          {#if isSubmitting}
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          {:else}
            <Check class="w-4 h-4" />
          {/if}
        </Button>
      </div>
    </div>
  {/if}

  <!-- Send/Resend OTP Button -->
  <Button
    size="default"
    variant="outline"
    onclick={handleSendOTP}
    disabled={isSubmitting || resendCooldown > 0}
    className="w-full h-10 text-sm font-semibold border-2 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400 transition-all disabled:opacity-50"
    type="button"
  >
    {#if isSubmitting}
      <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {:else}
      <Mail class="w-4 h-4 mr-2" />
    {/if}
    {#if resendCooldown > 0}
      Resend in {resendCooldown}s
    {:else if showOTPInput}
      Resend OTP
    {:else}
      Verify Email Now
    {/if}
  </Button>
</div>
