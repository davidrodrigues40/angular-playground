export interface DialogOptions
{
    okButton?: DialogButton;
    cancelButton?: DialogButton;
}

export interface DialogButton
{
    text: string;
    action: 'ok' | 'cancel';
    reason: string;
}