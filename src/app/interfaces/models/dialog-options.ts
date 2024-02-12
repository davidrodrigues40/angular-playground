export interface DialogOptions
{
   title?: string;
   okButton?: DialogButton;
   cancelButton?: DialogButton;
}

export interface DialogButton
{
   text: string;
   action: 'ok' | 'cancel';
   reason: string;
}