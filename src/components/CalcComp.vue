<template>
    <div class="container" style="max-width: 500px; margin: 50px auto">
      
      <!-- Calculator Output -->
      <div class="screen">
        {{ output || '0' }}
      </div>
  
      <!-- Calculator Buttons -->
        <div class="row btnContainer">
          <button class="bg-ac hover-class col-3" @click="clear">AC</button>
          <button class="bg-num hover-class col-3" @click="positiveOrNegative">-/+</button>
          <button class="bg-num hover-class col-3" @click="percentage">%</button>
          <button class="bg-orange hover-class col-3" @click="operation('/')">/</button>
          <button class="bg-num hover-class col-3" @click="getNum('7')">7</button>
          <button class="bg-num hover-class col-3" @click="getNum('8')">8</button>
          <button class="bg-num hover-class col-3" @click="getNum('9')">9</button>
          <button class="bg-orange hover-class col-3" @click="operation('*')">*</button>
          <button class="bg-num hover-class col-3" @click="getNum('4')">4</button>
          <button class="bg-num hover-class col-3" @click="getNum('5')">5</button>
          <button class="bg-num hover-class col-3" @click="getNum('6')">6</button>
          <button class="bg-orange hover-class col-3" @click="operation('-')">-</button>
          <button class="bg-num hover-class col-3" @click="getNum('1')">1</button>
          <button class="bg-num hover-class col-3" @click="getNum('2')">2</button>
          <button class="bg-num hover-class col-3" @click="getNum('3')">3</button>
          <button class="bg-orange hover-class col-3" @click="operation('+')">+</button>
          <button class="bg-num hover-class col-6 zeroBr" @click="getNum('0')">0</button>
          <button class="bg-num hover-class col-3" @click="addDot">.</button>
          <button class="bg-orange hover-class col-3 equalBr" @click="equal">=</button>
        </div>
      </div>
  </template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    setup() {
        const props = reactive({
            output: '',
            prevResult: null,
            opClicked: false,
            result: null,
            opClickedForEver: false
        })

        function clear() {
            props.output = '',
            props.opClickedForEver = false
        }

        function positiveOrNegative() {
            props.output = props.output[0] === '-' ? props.output.slice(1) : `-${props.output}`
        }

        function percentage() {
            props.output = parseFloat(props.output)/100;
        }

        function getNum(num) {
            if (props.opClicked) {
                props.output = ''
                props.opClicked = false
            }
            props.output = `${props.output}${num}`
        }

        function addDot() {
            if( props.output.indexOf('.') === -1) {
                props.output = props.output + '.'
            }
        }

        function afterOperate() {
            props.prevResult = props.output
            props.opClicked = true
            props.opClickedForEver = true
        }

        function operation(op) {
            switch (op) {
                case '+':
                    props.result = (a, b) => a + b
                    if( props.opClickedForEver === true) {
                        equal()
                    }
                    afterOperate()
                    break;
                case '-':
                    props.result = (a, b) => a - b
                    if( props.opClickedForEver === true) {
                        equal()
                    }
                    afterOperate()
                    break;
                case '/':
                    props.result = (a, b) => a / b
                    if( props.opClickedForEver === true) {
                        equal()
                    }
                    afterOperate()
                    break;
                case '*':
                    props.result = (a, b) => a * b
                    if( props.opClickedForEver === true) {
                        equal()
                    }
                    afterOperate()
                    break;
            }
        }

        function equal() {
            props.output = `${props.result(parseFloat(props.prevResult), parseFloat(props.output))}`
        }

        return {
            ...toRefs(props),
            clear,
            positiveOrNegative,
            percentage,
            getNum,
            addDot,
            operation,
            equal
        }

    }
}
</script>

<style scoped>
.container {
    display: grid;
    border-radius: 15px;
}
.screen {
  border-radius: 15px 15px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  background-color: #2D2E3C;
  color: aliceblue;
  width: 100%;
  padding: 30px 20px;
  font-size: 20px;
}
.bg-num {
    background: #5A6069;
    width: 100%;
    color: white;
    padding: 15px 0;
    border: 0.5px solid black;
    opacity: 1;
    transition: 0.4s;
  }
  .hover-class:hover {
    cursor: pointer;
    background: #636b74;
    opacity: 0.5;
  }
  .bg-orange {
    background: #FF9F0B;
    color: white;
    padding: 15px 0;
    border: 0.5px solid black;
    opacity: 1;
    transition: 0.4s;
  }
  .bg-orange:hover {
    color: black;
    opacity: 0.7;
  }
  .bg-ac {
    background: brown;
    color: white;
    padding: 15px 0;
    border: 0.5px solid black;
    opacity: 1;
    transition: 0.4s;
  }
  .btnContainer {
    border-color: aliceblue;
    border-radius: 15px;
  }
  .col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}
.equalBr {
    border-radius: 0 0 15px 0
}
.zeroBr {
    border-radius: 0 0 0 15px;
}
button {
    font-size: 20px;
}
</style>