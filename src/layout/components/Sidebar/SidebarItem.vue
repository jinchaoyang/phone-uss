<template>
  <div >
   <template>
      <app-link v-if="item.level==2"  :to="resolvePath(item.url)" >
        <el-menu-item :index="item.id" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="item.icon" :title="item.name" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-if="item.level==1"  ref="subMenu" :index="item.id" popper-append-to-body>
     <template slot="title">
        <item v-if="item.name" :icon="item.icon" :title="item.name" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.id"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.url)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {

    return {}
  },


  methods: {

    resolvePath(routePath) {
      routePath = routePath||"";
      let path = routePath.trim();
      if(!path.trim()){
        return "javascript:;"
      }
      var arr = path.split("/");
      if(arr.length>1){
        return arr[arr.length-1];
      }else{
        return arr[0];
      }
      return routePath;

    }
  }
}
</script>
