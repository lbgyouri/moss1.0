<template>
  <div>
    <ul>
      <li v-for="item in paginatedItems" :key="item.id">
        <!-- 显示分页后的数据 -->
        {{ item }}
      </li>
    </ul>
    
    <!-- 显示页数 -->
    <div>Total Pages: {{ totalPages }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // 原始数据数组
      currentPage: 1, // 当前页码
      pageSize: 10 // 每页显示的数据数量
    };
  },
  computed: {
    paginatedItems() {
      // 计算起始索引和结束索引
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      
      // 根据起始索引和结束索引截取数组数据
      return this.items.slice(startIndex, endIndex);
    },
    totalPages() {
      // 计算总页数
      return Math.ceil(this.items.length / this.pageSize);
    }
  }
};
</script>