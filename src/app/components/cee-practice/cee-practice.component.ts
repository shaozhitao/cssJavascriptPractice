import {HtmlAstPath} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cee-practice',
  templateUrl: './cee-practice.component.html',
  styleUrls: ['./cee-practice.component.scss']
})
export class CeePracticeComponent implements OnInit {
  maskHidden = true;
  rightViewHidden = true;
  container: HTMLElement;
  leftView: any;
  mask: any;
  smallImg: any;
  rightView: any;
  bigImg: any;
  constructor() {
  }

  ngOnInit(): void {
    this.initImg();
  }
  // TODO: 图片局部放大功能 --第一步
  initImg(): void {
    this.container = document.getElementById('container');
    this.leftView = document.getElementsByClassName('leftView')[0];
    this.mask = document.getElementsByClassName('mask')[0];
    // this.mask = document.getElementById('mask');
    this.smallImg = document.getElementsByClassName('small')[0];
    this.rightView = document.getElementsByClassName('rightView')[0];
    this.bigImg = document.getElementsByClassName('big')[0];
  }
  // TODO: 图片局部放大功能 --鼠标移入事件
  leftViewOverShow(): void {
    this.mask.style.display = 'block';
    this.rightView.style.display = 'block';
  }
  // TODO: 图片局部放大功能 --鼠标离开事件
  leftViewOverHidden(): void {
    this.mask.style.display = 'none';
    this.rightView.style.display = 'none';
  }
  // TODO: 图片局部放大功能 --鼠标移动事件
  leftViewOverMove(evt): void {
    evt = evt || window.event;
    // 获取当前鼠标的位置
    const currentMouseX = evt.pageX;
    const currentMouseY = evt.pageY;
    // 获取要放大图片左侧与顶部的偏移距离
    const offsetLeft = this.container.offsetLeft;
    const offsetTop = this.container.offsetTop;
    // 获取放大遮罩的大小
    const maskWidth = this.mask.offsetWidth;
    const maskHeight = this.mask.offsetHeight;
    // 计算鼠标移动后放大遮罩的位置 位置 = 当前鼠标的位置 - 偏移距离 - 放大遮罩大小/2
    let zoomMaskX = currentMouseX - offsetLeft - maskWidth / 2;
    let zoomMaskY = currentMouseY - offsetTop - maskHeight / 2;
    // 限制鼠标上侧与左侧的范围
    if (zoomMaskX <= 0) {
      zoomMaskX = 0;
    }
    if (zoomMaskY <= 0) {
      zoomMaskY = 0;
    }
    // 限制鼠标右侧与下侧的范围
    const maxScopeX = this.leftView.offsetWidth - maskWidth;
    if (zoomMaskX >= maxScopeX) {
      zoomMaskX = maxScopeX;
    }
    const maxkScopeY = this.leftView.offsetHeight - maskHeight;
    if (zoomMaskY >= maxkScopeY) {
      zoomMaskY = maxkScopeY;
    }
    // console.log('打印this.mask.style=>:', this.mask.style);
    this.mask.style.left = zoomMaskX + 'px';
    this.mask.style.top = zoomMaskY + 'px';
    // 计算图片放大比例 比例= (大图长度 - 大图父容器长度) / (小图父容器长度 - 放大遮罩长度)
    const zommProportion = (this.bigImg.offsetWidth - this.rightView.offsetWidth) / (this.leftView.offsetWidth - maskWidth);
    this.bigImg.style.left = -zommProportion * zoomMaskX + 'px';
    this.bigImg.style.top = -zommProportion * zoomMaskY + 'px';
  }
  // buttonHover() {
  //   document.getElementById('.button-two').addEventListener('mousemove', (e) => {
  //     const x = e.pageX - this.offsetLeft
  //     const y = e.pageY - this.offsetTop
  //
  //     this.style.setProperty('--x', `${ x }px`)
  //     this.style.setProperty('--y', `${ y }px`)
  //   });
  // }

  // createCanvas() {
  //   var canvas=<HTMLCanvasElement>document.getElementById('my_canvas');
  //   var gl=<WebGL2RenderingContext>canvas.getContext('webgl');
  // }
}
