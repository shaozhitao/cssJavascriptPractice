import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cee-practice',
  templateUrl: './cee-practice.component.html',
  styleUrls: ['./cee-practice.component.scss']
})
export class CeePracticeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
