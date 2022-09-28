<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="$emit('getPageInfo',pageNo-1)">上一页</button>
    <button  v-if="startAndEnd.start > 1" @click="$emit('getPageInfo',1)" >1</button>
    <button v-if="startAndEnd.start > 2">···</button>
    <span  v-for="(p,index) in startAndEnd.end" :key="index" @click="$emit('getPageInfo',p)">
    <button :class="{active:p===pageNo}" v-if="p >= startAndEnd.start"> {{p}}</button>
    </span>
    <button  v-if="startAndEnd.end < totalPage-1">···</button>
    <button v-if="startAndEnd.end < totalPage" @click="$emit('getPageInfo',Math.ceil(total/pageSize))">{{totalPage}}</button>
    <button :disabled="pageNo===totalPage" @click="$emit('getPageInfo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "MyPagination",
    data() {
      return {
       
      }
    },
    props:['pageNo','pageSize','total','continues'],
    methods: {
      getPageInfo(p){
        this.$emit('getPageInfo',p)
      },
      upPage(pageNo){
        this.$emit('upPage',pageNo)
      },
      downPage(pageNo){
        this.$emit("downPage",pageNo)
      }
    },
    computed:{
      totalPage(){
        return Math.ceil(this.total/this.pageSize)
      },
      startAndEnd(){
        const { pageNo, continues, totalPage } = this
        let start = 0
        let end = 0
        if(continues>totalPage){
         start =1 
         end = totalPage
        }else{
          start = pageNo - parseInt(continues/2) 
          end = pageNo + parseInt(continues/2) 
          if(start < 1){
            start = 1
            end = continues
          }
          if(end > totalPage){
            end = totalPage
            start = totalPage - continues+1
          }
        }
       return {start,end}
      }
    }
  }
  
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>