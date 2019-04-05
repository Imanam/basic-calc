/* jshint esversion: 6 */

var app = new Vue({
  el: "#vue-app",
  data: {
    result: "0",
    accumulator_1: 0.0,
    accumulator_2: 0.0,
    operation: "",
    initialisation : true,
    resultDisplayNeedsRefresh: false,
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
      console.log("value of acc2 in methods plus : " + this.accumulator_2);
      this.accumulator_1 = this.accumulator_2;
      console.log("value of acc1 in methods plus : " + this.accumulator_1);
      this.operation = "+";
      this.result="0";
      this.update_acc_2();
    },

    minus() {
      // enable to add '-' if the result is default

        this.accumulator_1 = this.accumulator_2;
        console.log(`acc1 de minus: ${this.accumulator_1}`);
        console.log(`acc2 de minus: ${this.accumulator_2}`);
        this.operation = "-";
        this.result="0";
        this.update_acc_2();
    },

    times() {
      this.accumulator_1 = this.accumulator_2;
      this.operation = "*";
      this.result="0";
      this.update_acc_2();
    },

    divide() {
      this.accumulator_1 = this.accumulator_2;
      this.operation = "/";
      this.result="0";
      this.update_acc_2();
    },

    plusmn() {
      console.log(this.result);
      this.result = parseFloat(this.result)
      if (this.result > 0) {
        this.result = -(this.result);
        console.log("add - to : " + this.result);
      }else if (this.result < 0){ 
        this.result= Math.abs(this.result);
        console.log("remove - to : " + this.result);        
      }
      this.result = this.result.toString();
      console.log ("result of plusmn : " + this.result);
      this.update_acc_2();
    },

    equal() {

      switch(this.operation) {

        case "+":
          console.log(this.accumulator_2 + ":" + this.accumulator_1);
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

        case "*":
          [this.accumulator_1, this.accumulator_2] = [this.accumulator_2, this.accumulator_1];
          this.accumulator_2 *= this.accumulator_1;
          this.result = this.accumulator_2.toString();
          this.accumulator_1 = 0.0;
          break;

        case "/":
          [this.accumulator_1, this.accumulator_2] = [this.accumulator_2, this.accumulator_1];
          this.accumulator_2 /= this.accumulator_1;
          this.result = this.accumulator_2.toString();
          this.accumulator_1 = 0.0;
          break;
       
      }
      this.initialisation = false;
    },
    
    addNumber : function (event) {
      if (this.initialisation === false){
        this.accumulator_2 = 0.0;
        this.result = this.accumulator_2.toString();
        this.initialisation = true;
      }
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
  },

  computed: {
      displayResult : {
        get : function(){
         if(this.resultDisplayNeedsRefresh) {
           this.resultDisplayNeedsRefresh = false;
         }
          return this.result;
        },
        set : function(v){
          const pattern =   /^[+,-]?([1-9]\d*|0)(\.\d+ | [.])?$/;
          if (pattern.test(v.trim()) === true) {
            this.result = v.trim();
          } else {
            this.resultDisplayNeedsRefresh=true;
          }
        this.update_acc_2();
        },

      },
  }

})