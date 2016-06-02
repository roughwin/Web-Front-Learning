var year = document.getElementById("year");
var month =  document.getElementById('month');
var date = document.getElementById('date');



var isLeap;
year.onchange = deal;
month.onchange = deal;
function deal(event) {
    if(year.options[year.selectedIndex].value%4){
        console.log(28);
        
        isLeap=false;
    }else{
        console.log(29);
        
        isLeap=true;
    }

    if(!year.selectedIndex){
        month.selectedIndex=0;
        date.selectedIndex=0;
    }


    var nDays;
    if ([1,3,5,7,8,10,12].indexOf(month.selectedIndex)>-1) {
        nDays=31;
    }else if(month.selectedIndex==2){        
        if(isLeap){
            nDays=29;            
           
        }else{
            nDays=28;
        }
    }else{
        nDays=30;
    }
    date.options.length=1;
  
    for (var i = 0; i < nDays; i++) {
                option = document.createElement("option");
                option.text = i+1;
                option.value = i+1;
                date.add(option,null);
            }
     if(year.selectedIndex==0){
        month.selectedIndex=0;
        date.options.length=1;
    }
    if (month.selectedIndex==0) {
        date.options.length=1;
    }
}
