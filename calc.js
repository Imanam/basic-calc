/* jshint esversion: 6 */

var app = new Vue({
  el: "#vue-app",
  data: {
    result: "0",
    accumulator_1: 0.0,
    accumulator_2: 0.0,
    operation: ""
  },
  methods: {
    // button events

    dot(event){
      let dot = /[.]/g;
      let dotCheck = this.result.search(dot);
      if (dotCheck === -1){
        this.result += event.target.innerHTML;
      }
    },

    clear() {
      this.result = "0";
      this.accumulator_1 = this.accumulator_2 = 0.0;
    },

    plus() {
      this.accumulator_1 = this.accumulator_2;
      console.log(`acc1 de plus: ${this.accumulator_1}`);
       console.log(`acc2 de plus: ${this.accumulator_2}`);
      this.operation = "+";
      this.result="0";
      this.update_acc_2();
    },

    minus(event) {
      // enable to add '-' if the result is default
      if (this.result === '0'){
        this.result = event.target.innerHTML;
        console.log(this.result);
        this.update_acc_2();
      }else{
        this.accumulator_1 = this.accumulator_2;
        console.log(`acc1 de minus: ${this.accumulator_1}`);
        console.log(`acc2 de minus: ${this.accumulator_2}`);
        this.operation = "-";
        this.result="0";
        this.update_acc_2();
      }
    },

    equal() {

      switch(this.operation) {

        case "+":
          this.accumulator_2 += this.accumulator_1;
          this.result = this.accumulator_2.toString();
          this.accumulator_1 = 0.0;
          break;

        case "-":
          console.log(`acc2 de equal : ${this.accumulator_2}`);
          console.log(`acc1 de equal: ${this.accumulator_1}`);
          this.accumulator_1 -= this.accumulator_2;
          [this.accumulator_1, this.accumulator_2] = [this.accumulator_2, this.accumulator_1];
          this.result = this.accumulator_2.toString();
          this.accumulator_1 = 0.0;
          break;

        default:
         this.accumulator_1 = 0.0;
         this.result = this.accumulator_2.ToString();
         break;
      }
    },
    
    addNumber : function (event) {
      // console.log(event.target.innerHTML);
      this.avoidsLeadingZero();
      this.result += event.target.innerHTML;
      this.update_acc_2();
    },

    // helpers
    update_acc_2() {
      this.accumulator_2 = parseFloat(this.result);
    },

    avoidsLeadingZero() {
      if(this.result==="0") {
        this.result="";
      }
    },

    // to do
    doblechecker(event){

    }
  }
})