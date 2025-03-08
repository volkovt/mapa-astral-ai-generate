import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>Confirmação</h1>
    <div mat-dialog-content>
      <p>Confirme as entradas:</p>
      <p><strong>Nome:</strong> {{ data.name }}</p>
      <p><strong>Nascimento:</strong> {{ data.nascimento }}</p>
      <p><strong>Cidade:</strong> {{ data.city }}</p>
      <p><strong>Email:</strong> {{ data.email }}</p>
    </div>
    <div mat-dialog-actions>
      <button class="bttn secondary" (click)="onCancel()">Cancelar</button>
      <button class="bttn primary" mat-button (click)="onConfirm()" cdkFocusInitial>Confirmar</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Retorna true se confirmado
  }

  onCancel(): void {
    this.dialogRef.close(false); // Retorna false se cancelado
  }
}
