import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TOTP } from "totp-generator"
/*
na pasta do projeto:

"npm install totp-generator" e depois "npm install". 

"npm install bootstrap@4.1.3 jquery@3.3.1 popper.js@1.14.3 --save" e depois "npm install".

no angular.json
    "styles": [
      "node_modules/bootstrap/dist/css/bootstrap.css",
      "src/styles.css"
    ],
    "scripts": [
      "node_modules/jquery/dist/jquery.js",
      "node_modules/popper.js/dist/umd/popper.js",
      "node_modules/bootstrap/dist/js/bootstrap.js"
    ]

  ng build --configuration production --aot  --base-href
*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
  title = 'Gerador de token TOTP Angular/TypeScript';

  linkBase32 = "https://datatracker.ietf.org/doc/html/rfc4648";
  linkTOTP = "https://datatracker.ietf.org/doc/html/rfc6238";
  linkNpmTotpGenerator = "https://www.npmjs.com/package/totp-generator";
  linkAngular = "https://angular.io/";

  textoCopiado = "";
  secret  = "";
  limpar = "null";
  
  //secret = "DZ5L4J5QBM546KW3XBFV5FOONGQAVCJQ";
  digitos = 6;

    atribuirValorSecret(event:any){
        this.secret = event.target.value;
    }

    atribuirValorDigito(event:any){
      this.digitos = event.target.value;
  }
  tokenTOTP: string = "******";

  generateTotpToken(){
    //console.log(this.secret);
    //console.log(this.digitos);
    this.tokenTOTP = TOTP.generate(this.secret, {digits: this.digitos, algorithm: "SHA-1", period: 30}).otp;
    this.secret = "pegadinha_do_malandro!";
    this.textoCopiado = "";
    this.copyToClipboard(this.limpar, "copy");
    
  }

  copiarToken(){
    this.copyToClipboard(this.tokenTOTP, "copy");
    this.textoCopiado = "Copiado para área de transferência";
  }

  copyToClipboard(token: string, action: string) {
    
    // Create a temporary textarea element to hold the text
    const textarea = document.createElement('textarea');
    textarea.value = token;
    
    // Append the textarea to the document
    document.body.appendChild(textarea);
    
    // Select the text in the textarea
    textarea.select();
    
    // Copy the selected text to the clipboard
    // Clipboard API aceita 'cut', 'copy' e 'paste' (https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
    document.execCommand(action);
    
    // Remove the textarea from the document
    document.body.removeChild(textarea);
    }
  
}
