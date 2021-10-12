import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  @Input() message: string;
  @Input() type: 'success';

  tipoAlertaValidado: number;

  constructor(
    public modal: BsModalRef

  ) { }

  ngOnInit() {
  }

  onClose() {
    this.modal.hide();

  }

  apresentaAlerta(tipoAlerta: string) {
    let apresentar = false;

    if(tipoAlerta == 'info') {
      apresentar = true;
      this.tipoAlertaValidado = 0;

    }else if(tipoAlerta == 'success') {
      apresentar = true;
      this.tipoAlertaValidado = 1;

    }else if(tipoAlerta == 'danger') {
      apresentar = true;
      this.tipoAlertaValidado = 2;

    }

    return apresentar;
  }

}
