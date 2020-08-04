import ThemePicker from '@/components/ThemePicker';
<template>
  <el-dialog v-bind="attrs" v-on="$listeners">
    <slot></slot>
    <span slot="footer" class="dialog-footer" v-if="!$slots.footer">
      <el-button v-if="cancelText" @click="$emit('update:visible', false)">{{ cancelText }}</el-button>
      <el-button type="primary" @click="e => $emit('confirmClick', e)" :loading="loading">{{confirmText}}</el-button>
    </span>
    <slot name="footer" slot="footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'better-dialog',
  props: {
    cancelText: {
      type: [String, Boolean],
      default: () => '取消'
    },
    loading: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: () => '确定'
    }
  },
  computed: {
    attrs() {
      const defaultAttr = {
        'close-on-click-modal': false,
        'show-close': true,
        width: '600px'
      };
      return {...defaultAttr, ...this.$attrs}
    }
  }
}
</script>

<style>

</style>