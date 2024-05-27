import { AfterViewInit, Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swiper from 'swiper';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit {
  constructor(private router: Router) {}

  products = [
    {
      id: 1,
      tag: 'Promotion',
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      description: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      seller: 'sara magdi',
      price: 450
    },
    {
      id: 2,
      tag: 'Promotion',
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      description: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      seller: 'sara magdi',
      price: 450
    },
    {
      id: 3,
      tag: 'Promotion',
      images: ['https://cdn.shopify.com/s/files/1/0341/3458/9485/products/FB_POSTHOL22_T2PRODUCT_CONCRETE_FENTY_ICON_VELVET_LIQUID_LIP_OPEN_MVP_1200x1500_ea016da9-a316-4f2b-8afd-9d822277a907.jpg?v=1669934439'],
      description: 'The Ordinary Niacinamide 10% And Zinc 1% Clear 30ml',
      seller: 'sara magdi',
      price: 450
    }
  ];

  ngAfterViewInit(): void {
    // const productsSwiper = new Swiper('.products-swiper', {
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
    //   autoplay: {
    //     delay: 1000,
    //     disableOnInteraction: false,
    //   },
    // });

    // const startBigDealSwiperAutoplay = () => {
    //   productsSwiper.autoplay.start();
    // };

    // const stopBigDealSwiperAutoplay = () => {
    //   productsSwiper.autoplay.stop();
    // };

    // const productsSwiperContainers = document.querySelectorAll('.products-swiper');
    // productsSwiperContainers.forEach(container => {
    //   container.addEventListener('mouseenter', startBigDealSwiperAutoplay);
    //   container.addEventListener('mouseleave', stopBigDealSwiperAutoplay);
    // });
  }

  faHeart = faHeart;

  goToProduct(id:number): void {
    this.router.navigate(['product/detail/',id]);
  }
}
