import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  //to recieve values from parent use input in child
  @Input() item:string | undefined
  @Input() serverMsg:string | undefined

  //to send values from child to parent use output in child

  //oncancel is a user defined event
  @Output() onCancel = new EventEmitter()

  @Output() onDelete =new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    //occur the oncancel event here using emit()
    this.onCancel.emit()

  }

  deleteChild(){
    let deleteConfirm =true
    this.onDelete.emit([this.item,deleteConfirm])
    this.item=""

  }

}
