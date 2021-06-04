<template>
  <div class="tiptap-wrapper">
    <!-- menu -->
    <div
      class="tiptap-menu d-flex flex-wrap align-items-center"
      v-if="editor"
    >
      <!-- basic formatting -->
      <div>
        <button
          type="button"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          b
        </button>

        <button
          type="button"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          s
        </button>

        <button
          type="button"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          i
        </button>

        <button
          type="button"
          @click="setLink"
          :class="{ 'is-active': editor.isActive('link') }"
        >
          url
        </button>

        <button
          type="button"
          @click="addImage"
        >
          img
        </button>
        <!-- hide -->
        <template v-if="false">
          <button
            type="button"
            @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
          >
            s
          </button>

          <button
            type="button"
            @click="editor.chain().focus().unsetLink().run()"
            v-if="editor.isActive('link')"
          >
            remove
          </button>
        </template>
      </div>
    </div>

    <editor-content :editor="editor" />
  </div>
</template>

<script>
import {
  Editor, EditorContent,
  // BubbleMenu,
  // FloatingMenu
} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
// import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

export default {
  components: {
    EditorContent,
    // BubbleMenu,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
    }
  },
  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value
      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()
      if (isSame) {
        return
      }
      this.editor.commands.setContent(this.modelValue, false)
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        // Highlight.configure({ multicolor: true }),
        Typography,
        Image,
        // TextAlign,
        Link,
        Underline
      ],      
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      },
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    addImage() {
      const url = window.prompt('URL'); 
      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },

    setLink() {
      const url = window.prompt('URL img'); 
      this.editor.chain().focus().setLink({ href: url }).run()
    },
  },
}
</script>
<style lang="scss">
.bubble-menu {
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;
  button {
    border: none;
    background: none;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;
    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
.floating-menu {
  display: flex;
  background-color: #0d0d0d10;
  padding: 0.2rem;
  border-radius: 0.5rem;
  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;
    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>