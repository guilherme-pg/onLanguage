module.exports = {
   
   async main(req, res){
      try{
         await res.render('index',{
            title: "On Languages",
            layout: 'mainLayouts',
            style: "index.css"
         }) 
      }catch(err){
         console.error(err)
      }
   },
   async options(req, res){
      try{
         await res.render('options', {
            title: "Options",
            layout: "mainLayouts",
            style: "options.css"
         })
      }catch(err){
         console.error(err)
      }
   },
   async dataRecord(req, res){
      try{
         await res.render('data-record', {
            title: "Data Record",
            layout: "mainLayouts",
            style: "data-record.css"
         })
      }catch(err){
         console.error(err)
      }
   }
}