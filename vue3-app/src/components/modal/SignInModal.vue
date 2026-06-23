<template>
  <div class="modal-bg" @click="emit('close')">
    <div class="modal sm" @click.stop>
      <div class="modal-head">
        <div style="font-family:var(--font-display);font-weight:700;font-size:17px">
          {{ tab === 'forgot' ? 'Forgot Password' : tab === 'signin' ? 'Welcome back' : 'Create your account' }}
        </div>
        <button class="modal-close" @click="emit('close')">
          <Icon name="close" :size="14" />
        </button>
      </div>

      <div class="modal-body">
        <!-- Forgot password -->
        <form v-if="tab === 'forgot'" @submit.prevent="submit">
          <div class="field">
            <label>Email</label>
            <input v-model="email" type="email" placeholder="Enter your email" />
          </div>
          <button type="submit" class="reset-btn">Send Reset Link</button>
          <div class="signin-foot">
            Remember your password?
            <a href="#" @click.prevent="tab = 'signin'">Back to Login</a>
          </div>
        </form>

        <!-- Sign in / Register -->
        <template v-else>
          <div class="signin-tabs">
            <button class="signin-tab" :class="{ active: tab === 'signin' }"   @click="tab = 'signin'">Sign in</button>
            <button class="signin-tab" :class="{ active: tab === 'register' }" @click="tab = 'register'">Register</button>
          </div>

          <form @submit.prevent="submit">
            <div v-if="tab === 'register'" class="field">
              <label>Username</label>
              <input v-model="username" placeholder="player_one" />
            </div>
            <div class="field">
              <label>Email</label>
              <input v-model="email" type="email" placeholder="you@email.com" />
            </div>
            <div class="field">
              <label>Password</label>
              <input v-model="pw" type="password" placeholder="••••••••" />
            </div>
            <div v-if="tab === 'register'" class="field">
              <label style="display:flex;align-items:center;gap:8px;color:var(--text-mid)">
                <input type="checkbox" checked style="margin:0" />
                <span style="font-size:12px">I'm 18+ and accept the Terms</span>
              </label>
            </div>
            <button type="submit" class="btn primary" style="width:100%;padding:12px;margin-top:6px">
              {{ tab === 'signin' ? 'Sign in →' : 'Create account →' }}
            </button>
          </form>

          <div class="signin-foot">
            <template v-if="tab === 'signin'">
              No account? <a href="#" @click.prevent="tab = 'register'">Register</a>
              · <a href="#" @click.prevent="tab = 'forgot'">Forgot?</a>
            </template>
            <template v-else>
              Already a player? <a href="#" @click.prevent="tab = 'signin'">Sign in</a>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Icon from '@/components/ui/Icon.vue';

const emit = defineEmits(['close', 'login']);

const tab      = ref('signin');
const email    = ref('player@100.gg');
const pw       = ref('');
const username = ref('');

function submit() {
  const name = tab.value === 'register' && username.value
    ? username.value
    : (email.value.split('@')[0] || 'player');
  emit('login', { name, email: email.value || 'player@100.gg' });
  emit('close');
}

function onKey(e) { if (e.key === 'Escape') emit('close'); }
onMounted(()   => window.addEventListener('keydown', onKey));
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>
