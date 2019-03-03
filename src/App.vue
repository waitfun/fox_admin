<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<script>
    export default {
      name:'App',
        data() {
            return {
              
            }
        },
        methods:{
           fetchTheme(){
             let theme = localStorage.getItem('theme')
             if(theme==null||theme == 'default'){
               //默认
               let path =  ('../static/theme/default/main.css')
               this.loadTheme(path)
               
             }else if(theme == 'ea1935'){
               //红色
               let path =  ('../static/theme/ea1935/main.css')
               this.loadTheme(path)
             }else if(theme == '27a009'){
               //绿色
               let path =  ('../static/theme/27a009/main.css')
               this.loadTheme(path)
             }else if(theme == '2571dc'){
               let path =  ('../static/theme/2571dc/main.css')
               this.loadTheme(path)
             }else{
                let path =  ('../static/theme/default/main.css')
                this.loadTheme(path)
             }
           },
           loadTheme(path){
             let head = document.getElementsByTagName('head')[0]
             let link = document.createElement('link')
             link.href = path
             link.rel = 'stylesheet'
             link.style = 'text/css'
             head.appendChild(link)
           },
        },
        mounted(){
          this.fetchTheme()
        }
    }
</script>

<style>
 /* @import "../static/css/main.css"; 
  @import "../static/css/color-dark.css"; */
  /* @import "../static/theme/#EA1935/main.css";     */

</style>
