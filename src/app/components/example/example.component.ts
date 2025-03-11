import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="items-container">
      @for (item of filteredItems; track item.id) {
        <div class="item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .items-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    .item {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
    }
    .item h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    .item p {
      margin: 0;
      color: #666;
    }
  `]
})
export class ExampleComponent implements OnInit {
  items: Item[] = [
    { id: 1, title: 'Item 1', description: 'Description for item 1' },
    { id: 2, title: 'Item 2', description: 'Description for item 2' },
    { id: 3, title: 'Item 3', description: 'Description for item 3' },
  ];
  filteredItems: Item[] = this.items;

  constructor() {}

  ngOnInit() {
   /*  this.searchService.searchTerm$.subscribe(term => {
      this.filteredItems = this.searchService.filterItems(
        this.items,
        term,
        ['title', 'description']
      );
    }); */
  }
} 