import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;

  constructor(private cartService: CartService) { 
    this.items = this.cartService.getItems();
  }

  ngOnInit() {
  }

  guardarOrden() {  
    this.cartService.saveCart();
    window.alert('Orden guardada');
  }

  Borrar(idx) {
    this.cartService.removeAt(idx);
  }

  BorrarTodo() {
    this.cartService.clearCart();
    window.location.reload();
  }

  downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }

  Exportar(filename) {
    var csv = [];
    var rows = document.querySelectorAll("#miTable tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    this.downloadCSV(csv.join("\n"), filename);
  }

}