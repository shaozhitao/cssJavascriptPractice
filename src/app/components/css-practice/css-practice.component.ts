import { Component, OnInit } from '@angular/core';
enum colorArr {red, green, blue}; // 枚举类型，可以和编号形成映射关系
@Component({
  selector: 'app-css-practice',
  templateUrl: './css-practice.component.html',
  styleUrls: ['./css-practice.component.scss']
})
export class CssPracticeComponent implements OnInit {
  arr:[string, number]; // 指定两个元素类型
  enumT: colorArr;
  enumTs: string = colorArr[1];
  constructor() { }

  ngOnInit() {
  }

  arrayTs() {
    this.arr = ['a', 1];
    this.enumT = colorArr.blue; 

  }

}
