import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmpdetailsService } from '../services/empdetails.service';

@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})
export class CustomtableComponent implements OnInit {
  employee: any = []
  searchtext: any
  empstatic:any=[]
  searchstatic:any
  showEdit:any
 


  empaddform = this.fb.group({
    empid: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
    empname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    empage: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
    empcity: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    empstate: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    empmobile: ['', [Validators.required, Validators.pattern('[0-9 ]*')]]
  })

  constructor(private empdl: EmpdetailsService, private fb: FormBuilder) {
    this.getdetails()
    this.empstatic =this.empdl.db
    this.showEdit=false
  }

  ngOnInit(): void {

  }

  savedetails() {
    if (this.employee) {
      localStorage.setItem('empdetails', JSON.stringify(this.employee))
    }
  }
  getdetails() {
    if (localStorage.getItem('empdetails')) {
      // this.employee= JSON.parse(localStorage.getItem("empdetails") || '')
      this.employee = JSON.parse(localStorage.getItem("empdetails") || '')

    }
  }

  add() {
    if (this.empaddform.valid) {
      this.employee.push(this.empaddform.value)
      console.log(this.employee);
      this.savedetails()
      this.empaddform.reset()
    }
    else{
      alert('Invalid form')
    }
  }

  reset() {
    this.empaddform.reset()
  }

  remove(item: any,id:any) {
    this.employee.forEach((value: any, index: any) => {
      if (value == item) {
        this.employee.splice(index, 1)
        localStorage.removeItem(item)
        this.savedetails()
      }
      
    });

  }

  removestatic(id:any,data:any){
    this.empstatic.forEach((value:any,index:any)=>{
      if(value==data){
        this.empstatic.splice(index,1)
        
      }

    })
    
  }

  edit(d:any){
    this.employee.forEach((element: { showEdit: boolean; })=> {
      element.showEdit=false
    });
    d.showEdit=true
  }

  update(d:any){
    d.showEdit=false

  }
}
