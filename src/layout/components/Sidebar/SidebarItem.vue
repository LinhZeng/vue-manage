<template>
  <div>
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <!-- 无子目录 -->
      <router-link v-if="hasOneShowingChild(item) && !item.alwaysShow"
                    :to="item.path + '/' + item.children[0].path"
                    :key="item.children[0].name">
        <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
      </router-link>
      <!-- 有子目录 -->
      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title" slot="title">{{ item.meta.title }}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <!-- 三级目录 -->
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :key="child.path"
            :is-nest="true"
            :routes="[child]"
            class="nest-menu"
          />
          <!-- 二级目录 -->
          <router-link v-else :to="item.path + '/' + child.path" :key="child.name">
            <el-menu-item :index="item.path + '/' + child.path">
              <i v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></i>
              <span v-if="child.meta&&child.meta.title" slot="title">{{ child.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    // route object
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {}
  },
  methods: {
    hasOneShowingChild(item) { // 有无子目录
      const {children} = item;
      const showingChildren = children.filter(item => {
        return !item.hidden;
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
  },
  created() {
    console.log(this.routes)
    // for(const o in this.routes) {
    //   const obj = this.routes[o];
    //   if(obj.meta && obj.meta.isIframe) {
    //     let src = obj.children[0].meta.src;
    //     if(obj.children[0].meta.isEncode) {
    //       src = src + '&isEncode=true';
    //     }
    //     obj.children[0].path = `urlPath?src=${src}`;
    //   }
    // }
  }
}
</script>
