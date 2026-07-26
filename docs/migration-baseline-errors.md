# Migration baseline results

## Lint

> shopella-app@0.0.0 lint
> eslint .


D:\1-Red\-WORK-\Prog\FED\React\projects\shopella-app\src\app\theme.tsx
  36:14  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

D:\1-Red\-WORK-\Prog\FED\React\projects\shopella-app\src\components\ai-elements\conversation.tsx
  124:14  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

D:\1-Red\-WORK-\Prog\FED\React\projects\shopella-app\src\components\ui\button-group.tsx
  82:3  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

D:\1-Red\-WORK-\Prog\FED\React\projects\shopella-app\src\components\ui\button.tsx
  67:18  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

Ô£û 4 problems (0 errors, 4 warnings)


## Typecheck

> shopella-app@0.0.0 typecheck
> tsc --noEmit


## Tests

> shopella-app@0.0.0 test
> vitest run --coverage


[1m[7m[36m RUN [39m[27m[22m [36mv2.1.9 [39m[90mD:/1-Red/-WORK-/Prog/FED/React/projects/shopella-app[39m
      [2mCoverage enabled with [22m[33mv8[39m

 [32mÔ£ô[39m src/features/orders/tests/order-calculations.test.ts [2m([22m[2m2 tests[22m[2m)[22m[90m 6[2mms[22m[39m
 [32mÔ£ô[39m src/features/orders/tests/services.test.ts [2m([22m[2m3 tests[22m[2m)[22m[90m 16[2mms[22m[39m
 [32mÔ£ô[39m src/features/wishlist/tests/wishlistSlice.test.ts [2m([22m[2m3 tests[22m[2m)[22m[90m 11[2mms[22m[39m
 [32mÔ£ô[39m src/features/cart/tests/cartSlice.test.ts [2m([22m[2m5 tests[22m[2m)[22m[90m 11[2mms[22m[39m
 [32mÔ£ô[39m api/orders.test.ts [2m([22m[2m4 tests[22m[2m)[22m[90m 10[2mms[22m[39m
 [32mÔ£ô[39m src/features/products/services.test.ts [2m([22m[2m3 tests[22m[2m)[22m[90m 18[2mms[22m[39m
 [32mÔ£ô[39m api/assistant.test.ts [2m([22m[2m3 tests[22m[2m)[22m[90m 10[2mms[22m[39m
 [32mÔ£ô[39m src/components/ui/ErrorBoundary.test.tsx [2m([22m[2m1 test[22m[2m)[22m[90m 149[2mms[22m[39m
stderr | src/features/wishlist/components/WishlistItemsList.test.tsx > WishlistItemsList > renders wishlist items when present
An empty string ("") was passed to the src attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to src instead of an empty string.

 [32mÔ£ô[39m src/features/orders/tests/Orders.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[90m 80[2mms[22m[39m
 [32mÔ£ô[39m src/features/wishlist/components/WishlistItemsList.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[90m 176[2mms[22m[39m
 [32mÔ£ô[39m src/features/cart/components/CartSummary.test.tsx [2m([22m[2m4 tests[22m[2m)[22m[90m 237[2mms[22m[39m
 [32mÔ£ô[39m src/features/products/tests/Products.test.tsx [2m([22m[2m1 test[22m[2m)[22m[90m 171[2mms[22m[39m
 [32mÔ£ô[39m src/features/checkout/tests/Checkout.session.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 516[2mms[22m[39m
   [33m[2mÔ£ô[22m[39m Checkout session customer data[2m > [22msaves customer data to sessionStorage after a successful order [33m425[2mms[22m[39m
stderr | src/app/userFlow.test.tsx > User flow: add to cart then checkout > adds product, navigates to cart, and goes to checkout
An empty string ("") was passed to the src attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to src instead of an empty string.

 [32mÔ£ô[39m src/features/checkout/tests/Checkout.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[33m 905[2mms[22m[39m
   [33m[2mÔ£ô[22m[39m Checkout success path[2m > [22mclears cart and navigates to confirmation on submit [33m365[2mms[22m[39m
   [33m[2mÔ£ô[22m[39m Checkout success path[2m > [22mkeeps the cart when order creation fails [33m328[2mms[22m[39m
 [32mÔ£ô[39m src/app/userFlow.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 601[2mms[22m[39m
   [33m[2mÔ£ô[22m[39m User flow: add to cart then checkout[2m > [22madds product, navigates to cart, and goes to checkout [33m598[2mms[22m[39m
 [32mÔ£ô[39m src/features/auth/auth-service.test.ts [2m([22m[2m1 test[22m[2m)[22m[90m 5[2mms[22m[39m

[2m Test Files [22m [1m[32m16 passed[39m[22m[90m (16)[39m
[2m      Tests [22m [1m[32m40 passed[39m[22m[90m (40)[39m
[2m   Start at [22m 18:54:03
[2m   Duration [22m 18.38s[2m (transform 1.78s, setup 26.85s, collect 16.72s, tests 2.92s, environment 139.10s, prepare 13.02s)[22m

[34m % [39m[2mCoverage report from [22m[33mv8[39m
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   41.83 |    57.36 |   48.58 |   41.83 |                   
 api               |       0 |        0 |       0 |       0 |                   
  assistant.ts     |       0 |        0 |       0 |       0 | 1-38              
  orders.ts        |       0 |        0 |       0 |       0 | 1-6               
 api/_lib          |   23.61 |    44.44 |   33.33 |   23.61 |                   
  ...ant-prompt.ts |     100 |    66.66 |     100 |     100 | 5                 
  ...ant-schema.ts |     100 |      100 |     100 |     100 |                   
  http.ts          |       0 |      100 |     100 |       0 | 6-24              
  order-schema.ts  |     100 |      100 |     100 |     100 |                   
  ...rs-handler.ts |       0 |        0 |       0 |       0 | 1-71              
  ...ct-catalog.ts |       0 |        0 |       0 |       0 | 1-29              
  server-config.ts |       0 |        0 |       0 |       0 | 1-10              
  ...ase-server.ts |       0 |        0 |       0 |       0 | 1-22              
 src               |       0 |        0 |       0 |       0 |                   
  App.tsx          |       0 |        0 |       0 |       0 | 1-11              
  main.tsx         |       0 |        0 |       0 |       0 | 1-32              
 src/app           |   30.51 |    53.84 |   55.55 |   30.51 |                   
  queryClient.ts   |       0 |        0 |       0 |       0 | 1-19              
  router.tsx       |       0 |        0 |       0 |       0 | 1-84              
  store.ts         |   61.11 |    66.66 |   66.66 |   61.11 | 12-15,18-24,51-54 
  theme.tsx        |   92.59 |     62.5 |      75 |   92.59 | 40-41             
 ...ts/ai-elements |       0 |        0 |       0 |       0 |                   
  conversation.tsx |       0 |        0 |       0 |       0 | 1-168             
  message.tsx      |       0 |        0 |       0 |       0 | 1-359             
 src/components/ui |   14.98 |    44.44 |   33.33 |   14.98 |                   
  AssistantFab.tsx |   29.03 |      100 |       0 |   29.03 | 11-36             
  ...tantPanel.tsx |       0 |        0 |       0 |       0 | 1-62              
  ...rBoundary.tsx |    93.1 |      100 |      80 |    93.1 | 23-24             
  ...dingState.tsx |       0 |        0 |       0 |       0 | 1-8               
  Toast.tsx        |       0 |        0 |       0 |       0 | 1-70              
  ...-fab-tools.ts |       0 |        0 |       0 |       0 | 1-9               
  button-group.tsx |       0 |        0 |       0 |       0 | 1-76              
  button.tsx       |       0 |        0 |       0 |       0 | 1-65              
  focus-tools.ts   |     100 |      100 |     100 |     100 |                   
  separator.tsx    |       0 |        0 |       0 |       0 | 1-24              
  toastContext.ts  |     100 |       50 |     100 |     100 | 19                
  tooltip.tsx      |       0 |        0 |       0 |       0 | 1-55              
  ...alog-focus.ts |   43.33 |    66.66 |   33.33 |   43.33 | 15-18,25-33,37-40 
 ...features/about |       0 |        0 |       0 |       0 |                   
  about-data.ts    |       0 |        0 |       0 |       0 | 1-20              
 ...out/components |       0 |        0 |       0 |       0 |                   
  ...amSection.tsx |       0 |        0 |       0 |       0 | 1-29              
  ...esSection.tsx |       0 |        0 |       0 |       0 | 1-29              
 ...es/about/pages |       0 |        0 |       0 |       0 |                   
  About.tsx        |       0 |        0 |       0 |       0 | 1-34              
 .../account/pages |       0 |        0 |       0 |       0 |                   
  Account.tsx      |       0 |        0 |       0 |       0 | 1-7               
 src/features/auth |   29.03 |     12.5 |    7.14 |   29.03 |                   
  ...nProvider.tsx |       0 |        0 |       0 |       0 | 1-27              
  RequireAuth.tsx  |       0 |        0 |       0 |       0 | 1-21              
  auth-service.ts  |    31.7 |       25 |    12.5 |    31.7 | ...40,43-46,49-51 
  ...on-context.ts |       0 |        0 |       0 |       0 | 1-11              
  authSlice.ts     |   77.77 |      100 |       0 |   77.77 | 22-23,25-26       
  login-tools.ts   |   14.28 |      100 |       0 |   14.28 | 12-24             
  ...ase-client.ts |     100 |        0 |     100 |     100 | 8                 
 ...uth/components |      25 |      100 |      25 |      25 |                   
  ...erContent.tsx |     100 |      100 |      50 |     100 |                   
  AuthForm.tsx     |   12.69 |      100 |       0 |   12.69 | 11-72             
  LoginField.tsx   |    37.5 |      100 |       0 |    37.5 | 16-20             
 ...res/auth/pages |       0 |        0 |       0 |       0 |                   
  Login.tsx        |       0 |        0 |       0 |       0 | 1-22              
 src/features/cart |   89.18 |    69.23 |      80 |   89.18 |                   
  cartSlice.ts     |   91.66 |       75 |     100 |   91.66 | 36-38             
  index.ts         |       0 |        0 |       0 |       0 | 1                 
 ...art/components |   91.59 |       75 |      50 |   91.59 |                   
  ...ItemsList.tsx |   87.01 |       60 |      25 |   87.01 | 11-14,50-56       
  CartSummary.tsx  |     100 |      100 |     100 |     100 |                   
 ...res/cart/pages |     100 |      100 |     100 |     100 |                   
  Cart.tsx         |     100 |      100 |     100 |     100 |                   
 ...tures/checkout |    92.3 |    44.44 |     100 |    92.3 |                   
  ...kout-tools.ts |    92.3 |    44.44 |     100 |    92.3 | 29-30,40          
 ...out/components |     100 |    73.33 |   81.81 |     100 |                   
  CheckoutForm.tsx |     100 |    71.42 |   77.77 |     100 | 25,38-46,50-57,64 
  ...tProgress.tsx |     100 |      100 |     100 |     100 |                   
  OrderSummary.tsx |     100 |      100 |     100 |     100 |                   
 ...checkout/pages |   58.82 |       70 |   66.66 |   58.82 |                   
  Checkout.tsx     |     100 |    77.77 |     100 |     100 | 20-21             
  ...firmation.tsx |       0 |        0 |       0 |       0 | 1-42              
 ...checkout/tests |     100 |      100 |     100 |     100 |                   
  ...est-tools.tsx |     100 |      100 |     100 |     100 |                   
 ...es/error/pages |       0 |        0 |       0 |       0 |                   
  ErrorPage.tsx    |       0 |        0 |       0 |       0 | 1-20              
  NotFound.tsx     |       0 |        0 |       0 |       0 | 1-21              
 ...ome/components |       0 |        0 |       0 |       0 |                   
  Banner.tsx       |       0 |        0 |       0 |       0 | 1-58              
  ...ellersRow.tsx |       0 |        0 |       0 |       0 | 1-12              
  ...StoryMini.tsx |       0 |        0 |       0 |       0 | 1-21              
  CategoryGrid.tsx |       0 |        0 |       0 |       0 | 1-42              
  ...ctionGrid.tsx |       0 |        0 |       0 |       0 | 1-30              
  ...leedImage.tsx |       0 |        0 |       0 |       0 | 1-15              
  ...tScroller.tsx |       0 |        0 |       0 |       0 | 1-115             
  HomeSections.tsx |       0 |        0 |       0 |       0 | 1-6               
  ...upSection.tsx |       0 |        0 |       0 |       0 | 1-41              
  ...MediaCard.tsx |       0 |        0 |       0 |       0 | 1-41              
  RichText.tsx     |       0 |        0 |       0 |       0 | 1-11              
  Scrollbar.tsx    |       0 |        0 |       0 |       0 | 1-12              
  ...taSection.tsx |       0 |        0 |       0 |       0 | 1-16              
  ...psSection.tsx |       0 |        0 |       0 |       0 | 1-25              
  ...ofSection.tsx |       0 |        0 |       0 |       0 | 1-22              
  TrustBar.tsx     |       0 |        0 |       0 |       0 | 1-27              
  index.ts         |       0 |        0 |       0 |       0 | 1                 
  ...-row-tools.ts |       0 |        0 |       0 |       0 | 1-81              
 ...res/home/pages |       0 |        0 |       0 |       0 |                   
  Home.tsx         |       0 |        0 |       0 |       0 | 1-46              
 ...eatures/orders |   87.27 |    84.21 |   91.66 |   87.27 |                   
  hooks.ts         |   66.66 |      100 |      75 |   66.66 | 7-11              
  ...lculations.ts |     100 |      100 |     100 |     100 |                   
  services.ts      |   92.59 |    66.66 |     100 |   92.59 | 15-16             
  types.ts         |       0 |        0 |       0 |       0 |                   
 ...s/orders/pages |   71.23 |    61.53 |      50 |   71.23 |                   
  Orders.tsx       |   71.23 |    61.53 |      50 |   71.23 | ...40-47,52-55,58 
 ...tures/products |   69.86 |       50 |      75 |   69.86 |                   
  hooks.ts         |       0 |        0 |       0 |       0 | 1-26              
  index.ts         |       0 |        0 |       0 |       0 | 1                 
  ...vice-tools.ts |     100 |      100 |     100 |     100 |                   
  ...page-tools.ts |   63.26 |       20 |   66.66 |   63.26 | 19-37,58-59,63-65 
  services.ts      |    92.1 |    71.42 |     100 |    92.1 | 39,51-52          
 ...cts/components |   69.69 |    57.14 |   52.63 |   69.69 |                   
  ...tersSheet.tsx |   21.87 |      100 |       0 |   21.87 | 18-44             
  ProductCard.tsx  |   86.66 |       40 |      80 |   86.66 | 30-34,38,58-60    
  ...ctFilters.tsx |     100 |      100 |   33.33 |     100 |                   
  ...ctGallery.tsx |       0 |        0 |       0 |       0 | 1-27              
  ProductPrice.tsx |   82.35 |       50 |     100 |   82.35 | 18-20             
  ...letonCard.tsx |     100 |      100 |     100 |     100 |                   
  ...ortSelect.tsx |     100 |      100 |      50 |     100 |                   
  ...mptyState.tsx |    37.5 |      100 |       0 |    37.5 | 4-8               
  ...rrorState.tsx |    37.5 |      100 |       0 |    37.5 | 9-14              
  ProductsGrid.tsx |     100 |    66.66 |     100 |     100 | 6                 
  ...dingState.tsx |     100 |      100 |     100 |     100 |                   
  ...dProducts.tsx |       0 |        0 |       0 |       0 | 1-17              
 .../products/data |     100 |      100 |     100 |     100 |                   
  categories.ts    |     100 |      100 |     100 |     100 |                   
 ...products/pages |   42.41 |       72 |   27.27 |   42.41 |                   
  ...ctDetails.tsx |       0 |        0 |       0 |       0 | 1-116             
  Products.tsx     |   69.85 |       75 |      30 |   69.85 | ...02-105,119-127 
 ...products/tests |     100 |      100 |     100 |     100 |                   
  ...est-tools.tsx |     100 |      100 |     100 |     100 |                   
 ...etailers/pages |       0 |        0 |       0 |       0 |                   
  Retailers.tsx    |       0 |        0 |       0 |       0 | 1-23              
 ...tures/wishlist |   95.83 |    83.33 |   66.66 |   95.83 |                   
  index.ts         |       0 |        0 |       0 |       0 | 1                 
  wishlistSlice.ts |     100 |      100 |     100 |     100 |                   
 ...ist/components |     100 |       80 |   33.33 |     100 |                   
  ...ItemsList.tsx |     100 |       80 |   33.33 |     100 | 41                
 ...wishlist/pages |       0 |        0 |       0 |       0 |                   
  Wishlist.tsx     |       0 |        0 |       0 |       0 | 1-28              
 src/layouts       |   98.68 |    77.77 |      90 |   98.68 |                   
  Header.tsx       |     100 |      100 |     100 |     100 |                   
  Main.tsx         |     100 |      100 |     100 |     100 |                   
  RootLayout.tsx   |     100 |       80 |     100 |     100 | 46,49-50          
  index.ts         |       0 |        0 |       0 |       0 | 1                 
 ...layouts/header |   94.71 |    60.78 |   78.94 |   94.71 |                   
  ...mentStrip.tsx |   93.75 |      100 |     100 |   93.75 | 9                 
  LoginDrawer.tsx  |     100 |       25 |     100 |     100 | 29-50             
  Logo.tsx         |     100 |      100 |     100 |     100 |                   
  ...ategories.tsx |     100 |      100 |     100 |     100 |                   
  NavbarIcons.tsx  |     100 |    81.81 |     100 |     100 | 10,20             
  SearchDrawer.tsx |     100 |    28.57 |      25 |     100 | 16-55             
  ...chResults.tsx |      44 |    16.66 |     100 |      44 | 20-33             
  ThemeToggle.tsx  |     100 |    33.33 |     100 |     100 | 15-17             
  header-tools.ts  |     100 |      100 |     100 |     100 |                   
  ...der-drawer.ts |     100 |      100 |      50 |     100 |                   
 src/lib           |       0 |        0 |       0 |       0 |                   
  utils.ts         |       0 |        0 |       0 |       0 | 1-5               
-------------------|---------|----------|---------|---------|-------------------

## E2E tests

> shopella-app@0.0.0 test:e2e
> playwright test


Running 4 tests using 2 workers

  Ô£ô  2 e2e\accessibility.spec.ts:16:3 ÔÇ║ /products has no serious automated accessibility violations (1.2s)
  Ô£ô  1 e2e\checkout.spec.ts:9:1 ÔÇ║ sign in, browse, add to cart, and submit checkout (2.2s)
  Ô£ô  3 e2e\accessibility.spec.ts:16:3 ÔÇ║ /login has no serious automated accessibility violations (1.1s)
  Ô£ô  4 e2e\accessibility.spec.ts:25:1 ÔÇ║ assistant supports keyboard opening and Escape closing (847ms)

  4 passed (8.6s)

## Build

> shopella-app@0.0.0 build
> tsc -b && vite build

[36mvite v6.2.6 [32mbuilding for production...[36m[39m
transforming...
[32mÔ£ô[39m 4917 modules transformed.
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                                       [39m[1m[2m    0.48 kB[22m[1m[22m[2m Ôöé gzip:   0.31 kB[22m
[2mdist/[22m[32massets/app-logo-CZ6opnKW.png                     [39m[1m[2m   10.59 kB[22m[1m[22m
[2mdist/[22m[32massets/Person-DlIdTIEO.jpg                       [39m[1m[2m   69.23 kB[22m[1m[22m
[2mdist/[22m[32massets/DMSerifText-Italic-BMwgstVi.ttf           [39m[1m[2m   70.28 kB[22m[1m[22m
[2mdist/[22m[32massets/DMSerifText-Regular-RZDsWePl.ttf          [39m[1m[2m   73.99 kB[22m[1m[22m
[2mdist/[22m[32massets/furniture-TOWYdFGj.jpg                    [39m[1m[2m  817.20 kB[22m[1m[22m
[2mdist/[22m[32massets/beauty-BZwEUh3U.jpg                       [39m[1m[2m1,231.39 kB[22m[1m[22m
[2mdist/[22m[32massets/fragrances-BWGFH1Bc.jpg                   [39m[1m[2m1,430.95 kB[22m[1m[22m
[2mdist/[22m[32massets/daily-rituals-g6Ngu9bX.jpg                [39m[1m[2m1,567.08 kB[22m[1m[22m
[2mdist/[22m[32massets/fresh-finds-Bbf0-vGs.jpg                  [39m[1m[2m1,611.40 kB[22m[1m[22m
[2mdist/[22m[32massets/Banner-top-D-yTmqiO.png                   [39m[1m[2m1,689.40 kB[22m[1m[22m
[2mdist/[22m[32massets/Banner-middle-BGvdgK64.png                [39m[1m[2m1,780.32 kB[22m[1m[22m
[2mdist/[22m[32massets/Banner-newsletter-HMLzpYEt.png            [39m[1m[2m1,989.71 kB[22m[1m[22m
[2mdist/[22m[32massets/Banner-philosophy-CEOVtSpS.png            [39m[1m[2m2,036.86 kB[22m[1m[22m
[2mdist/[22m[32massets/groceries-DomQ6Fe_.jpg                    [39m[1m[2m2,244.43 kB[22m[1m[22m
[2mdist/[22m[32massets/summer-essentials-BFtuIRli.jpg            [39m[1m[2m3,273.64 kB[22m[1m[22m
[2mdist/[22m[35massets/index-BDfR2DjO.css                        [39m[1m[2m   88.03 kB[22m[1m[22m[2m Ôöé gzip:  17.19 kB[22m
[2mdist/[22m[36massets/Banner-middle-Dj7kSvXD.js                 [39m[1m[2m    0.06 kB[22m[1m[22m[2m Ôöé gzip:   0.08 kB[22m
[2mdist/[22m[36massets/channel-FJbtoppz.js                       [39m[1m[2m    0.12 kB[22m[1m[22m[2m Ôöé gzip:   0.13 kB[22m
[2mdist/[22m[36massets/init-Gi6I4Gst.js                          [39m[1m[2m    0.15 kB[22m[1m[22m[2m Ôöé gzip:   0.13 kB[22m
[2mdist/[22m[36massets/chunk-2Q5K7J3B-DuiuT8WK.js                [39m[1m[2m    0.20 kB[22m[1m[22m[2m Ôöé gzip:   0.17 kB[22m
[2mdist/[22m[36massets/Account-DMNiXS--.js                       [39m[1m[2m    0.21 kB[22m[1m[22m[2m Ôöé gzip:   0.18 kB[22m
[2mdist/[22m[36massets/chunk-XXDRQBXY-C3UJcm-T.js                [39m[1m[2m    0.24 kB[22m[1m[22m[2m Ôöé gzip:   0.22 kB[22m
[2mdist/[22m[36massets/order-calculations-JKUA53cA.js            [39m[1m[2m    0.28 kB[22m[1m[22m[2m Ôöé gzip:   0.23 kB[22m
[2mdist/[22m[36massets/chunk-JWPE2WC7-Blk98kj3.js                [39m[1m[2m    0.30 kB[22m[1m[22m[2m Ôöé gzip:   0.21 kB[22m
[2mdist/[22m[36massets/chunk-5VM5RSS4-bo0PcZ7V.js                [39m[1m[2m    0.37 kB[22m[1m[22m[2m Ôöé gzip:   0.28 kB[22m
[2mdist/[22m[36massets/stateDiagram-v2-6OUMAXLB-BskVNe6R.js      [39m[1m[2m    0.43 kB[22m[1m[22m[2m Ôöé gzip:   0.31 kB[22m
[2mdist/[22m[36massets/ProductPrice-BemSjsnR.js                  [39m[1m[2m    0.44 kB[22m[1m[22m[2m Ôöé gzip:   0.29 kB[22m
[2mdist/[22m[36massets/classDiagram-OUVF2IWQ-CBCEM-_y.js         [39m[1m[2m    0.47 kB[22m[1m[22m[2m Ôöé gzip:   0.32 kB[22m
[2mdist/[22m[36massets/classDiagram-v2-EOCWNBFH-CBCEM-_y.js      [39m[1m[2m    0.47 kB[22m[1m[22m[2m Ôöé gzip:   0.32 kB[22m
[2mdist/[22m[36massets/highlighted-body-OFNGDK62-CCNBPoQL.js     [39m[1m[2m    0.48 kB[22m[1m[22m[2m Ôöé gzip:   0.33 kB[22m
[2mdist/[22m[36massets/Login-Jp3DFpmW.js                         [39m[1m[2m    0.50 kB[22m[1m[22m[2m Ôöé gzip:   0.31 kB[22m
[2mdist/[22m[36massets/chunk-VR4S4FIN-BJDKA3L8.js                [39m[1m[2m    0.54 kB[22m[1m[22m[2m Ôöé gzip:   0.39 kB[22m
[2mdist/[22m[36massets/codeowners-Bp6g37R7.js                    [39m[1m[2m    0.55 kB[22m[1m[22m[2m Ôöé gzip:   0.32 kB[22m
[2mdist/[22m[36massets/swimlanesDiagram-G3AALYLV-Cj-kzT6z.js     [39m[1m[2m    0.55 kB[22m[1m[22m[2m Ôöé gzip:   0.37 kB[22m
[2mdist/[22m[36massets/NotFound-C_uB4tOm.js                      [39m[1m[2m    0.58 kB[22m[1m[22m[2m Ôöé gzip:   0.32 kB[22m
[2mdist/[22m[36massets/infoDiagram-FWYZ7A6U-D9bDvA4-.js          [39m[1m[2m    0.59 kB[22m[1m[22m[2m Ôöé gzip:   0.41 kB[22m
[2mdist/[22m[36massets/shellsession-BADoaaVG.js                  [39m[1m[2m    0.71 kB[22m[1m[22m[2m Ôöé gzip:   0.43 kB[22m
[2mdist/[22m[36massets/Retailers-BSbkgbfb.js                     [39m[1m[2m    0.73 kB[22m[1m[22m[2m Ôöé gzip:   0.42 kB[22m
[2mdist/[22m[36massets/tsv-B_m7g4N7.js                           [39m[1m[2m    0.74 kB[22m[1m[22m[2m Ôöé gzip:   0.34 kB[22m
[2mdist/[22m[36massets/html-derivative-BFtXZ54Q.js               [39m[1m[2m    0.90 kB[22m[1m[22m[2m Ôöé gzip:   0.50 kB[22m
[2mdist/[22m[36massets/git-rebase-r7XF79zn.js                    [39m[1m[2m    0.98 kB[22m[1m[22m[2m Ôöé gzip:   0.44 kB[22m
[2mdist/[22m[36massets/qmldir-C8lEn-DE.js                        [39m[1m[2m    1.00 kB[22m[1m[22m[2m Ôöé gzip:   0.45 kB[22m
[2mdist/[22m[36massets/sizeCapture-X5ZJPWSS-D-zcXn29.js          [39m[1m[2m    1.00 kB[22m[1m[22m[2m Ôöé gzip:   0.57 kB[22m
[2mdist/[22m[36massets/csv-fuZLfV_i.js                           [39m[1m[2m    1.14 kB[22m[1m[22m[2m Ôöé gzip:   0.37 kB[22m
[2mdist/[22m[36massets/ordinal-Cboi1Yqb.js                       [39m[1m[2m    1.19 kB[22m[1m[22m[2m Ôöé gzip:   0.57 kB[22m
[2mdist/[22m[36massets/git-commit-F4YmCXRG.js                    [39m[1m[2m    1.23 kB[22m[1m[22m[2m Ôöé gzip:   0.53 kB[22m
[2mdist/[22m[36massets/xsl-CtQFsRM5.js                           [39m[1m[2m    1.39 kB[22m[1m[22m[2m Ôöé gzip:   0.52 kB[22m
[2mdist/[22m[36massets/dotenv-Da5cRb03.js                        [39m[1m[2m    1.42 kB[22m[1m[22m[2m Ôöé gzip:   0.53 kB[22m
[2mdist/[22m[36massets/OrderConfirmation-CgXcn1T-.js             [39m[1m[2m    1.44 kB[22m[1m[22m[2m Ôöé gzip:   0.66 kB[22m
[2mdist/[22m[36massets/sparql-rVzFXLq3.js                        [39m[1m[2m    1.48 kB[22m[1m[22m[2m Ôöé gzip:   0.82 kB[22m
[2mdist/[22m[36massets/ini-BEwlwnbL.js                           [39m[1m[2m    1.53 kB[22m[1m[22m[2m Ôöé gzip:   0.50 kB[22m
[2mdist/[22m[36massets/railroadDiagram-RFXS5EU6-DLvoP5wf.js      [39m[1m[2m    1.61 kB[22m[1m[22m[2m Ôöé gzip:   0.76 kB[22m
[2mdist/[22m[36massets/fortran-fixed-form-CkoXwp7k.js            [39m[1m[2m    1.67 kB[22m[1m[22m[2m Ôöé gzip:   0.69 kB[22m
[2mdist/[22m[36massets/docker-BcOcwvcX.js                        [39m[1m[2m    1.74 kB[22m[1m[22m[2m Ôöé gzip:   0.60 kB[22m
[2mdist/[22m[36massets/hxml-Bvhsp5Yf.js                          [39m[1m[2m    1.74 kB[22m[1m[22m[2m Ôöé gzip:   0.88 kB[22m
[2mdist/[22m[36massets/abnfDiagram-VRR7QNED-DjyrfsVe.js          [39m[1m[2m    1.81 kB[22m[1m[22m[2m Ôöé gzip:   0.90 kB[22m
[2mdist/[22m[36massets/desktop-BmXAJ9_W.js                       [39m[1m[2m    1.83 kB[22m[1m[22m[2m Ôöé gzip:   0.76 kB[22m
[2mdist/[22m[36massets/chunk-32BRIVSS-D8Z4G-pU.js                [39m[1m[2m    1.89 kB[22m[1m[22m[2m Ôöé gzip:   0.84 kB[22m
[2mdist/[22m[36massets/pegDiagram-2B236MQR-CGz-i-Go.js           [39m[1m[2m    1.96 kB[22m[1m[22m[2m Ôöé gzip:   0.93 kB[22m
[2mdist/[22m[36massets/Wishlist-DZQH9MvI.js                      [39m[1m[2m    2.00 kB[22m[1m[22m[2m Ôöé gzip:   0.82 kB[22m
[2mdist/[22m[36massets/ebnfDiagram-CCIWWBDH-B5inwpB1.js          [39m[1m[2m    2.01 kB[22m[1m[22m[2m Ôöé gzip:   0.89 kB[22m
[2mdist/[22m[36massets/ProductCard-CtpQUw7Y.js                   [39m[1m[2m    2.05 kB[22m[1m[22m[2m Ôöé gzip:   0.94 kB[22m
[2mdist/[22m[36massets/wenyan-BV7otONQ.js                        [39m[1m[2m    2.16 kB[22m[1m[22m[2m Ôöé gzip:   1.09 kB[22m
[2mdist/[22m[36massets/jssm-C2t-YnRu.js                          [39m[1m[2m    2.24 kB[22m[1m[22m[2m Ôöé gzip:   0.62 kB[22m
[2mdist/[22m[36massets/reg-C-SQnVFl.js                           [39m[1m[2m    2.35 kB[22m[1m[22m[2m Ôöé gzip:   0.70 kB[22m
[2mdist/[22m[36massets/edge-BkV0erSs.js                          [39m[1m[2m    2.36 kB[22m[1m[22m[2m Ôöé gzip:   0.70 kB[22m
[2mdist/[22m[36massets/diff-D97Zzqfu.js                          [39m[1m[2m    2.57 kB[22m[1m[22m[2m Ôöé gzip:   0.70 kB[22m
[2mdist/[22m[36massets/gleam-BspZqrRM.js                         [39m[1m[2m    2.58 kB[22m[1m[22m[2m Ôöé gzip:   0.82 kB[22m
[2mdist/[22m[36massets/erb-B12qg9BL.js                           [39m[1m[2m    2.61 kB[22m[1m[22m[2m Ôöé gzip:   0.84 kB[22m
[2mdist/[22m[36massets/hy-DFXneXwc.js                            [39m[1m[2m    2.65 kB[22m[1m[22m[2m Ôöé gzip:   1.18 kB[22m
[2mdist/[22m[36massets/Orders-SX1Z4whf.js                        [39m[1m[2m    2.80 kB[22m[1m[22m[2m Ôöé gzip:   0.95 kB[22m
[2mdist/[22m[36massets/json-Cp-IABpG.js                          [39m[1m[2m    2.82 kB[22m[1m[22m[2m Ôöé gzip:   0.78 kB[22m
[2mdist/[22m[36massets/openscad-C4EeE6gA.js                      [39m[1m[2m    2.82 kB[22m[1m[22m[2m Ôöé gzip:   1.01 kB[22m
[2mdist/[22m[36massets/log-2UxHyX5q.js                           [39m[1m[2m    2.85 kB[22m[1m[22m[2m Ôöé gzip:   0.90 kB[22m
[2mdist/[22m[36massets/cairo-KRGpt6FW.js                         [39m[1m[2m    2.94 kB[22m[1m[22m[2m Ôöé gzip:   0.81 kB[22m
[2mdist/[22m[36massets/berry-uYugtg8r.js                         [39m[1m[2m    3.01 kB[22m[1m[22m[2m Ôöé gzip:   0.81 kB[22m
[2mdist/[22m[36massets/jsonl-DcaNXYhu.js                         [39m[1m[2m    3.01 kB[22m[1m[22m[2m Ôöé gzip:   0.79 kB[22m
[2mdist/[22m[36massets/jsonc-Des-eS-w.js                         [39m[1m[2m    3.11 kB[22m[1m[22m[2m Ôöé gzip:   0.80 kB[22m
[2mdist/[22m[36massets/logo-BtOb2qkB.js                          [39m[1m[2m    3.13 kB[22m[1m[22m[2m Ôöé gzip:   1.47 kB[22m
[2mdist/[22m[36massets/po-BTJTHyun.js                            [39m[1m[2m    3.24 kB[22m[1m[22m[2m Ôöé gzip:   0.91 kB[22m
[2mdist/[22m[36massets/json5-C9tS-k6U.js                         [39m[1m[2m    3.25 kB[22m[1m[22m[2m Ôöé gzip:   0.83 kB[22m
[2mdist/[22m[36massets/mipsasm-CKIfxQSi.js                       [39m[1m[2m    3.26 kB[22m[1m[22m[2m Ôöé gzip:   1.18 kB[22m
[2mdist/[22m[36massets/tasl-QIJgUcNo.js                          [39m[1m[2m    3.29 kB[22m[1m[22m[2m Ôöé gzip:   0.85 kB[22m
[2mdist/[22m[36massets/genie-D0YGMca9.js                         [39m[1m[2m    3.36 kB[22m[1m[22m[2m Ôöé gzip:   1.21 kB[22m
[2mdist/[22m[36massets/rel-C3B-1QV4.js                           [39m[1m[2m    3.37 kB[22m[1m[22m[2m Ôöé gzip:   1.11 kB[22m
[2mdist/[22m[36massets/vala-CsfeWuGM.js                          [39m[1m[2m    3.37 kB[22m[1m[22m[2m Ôöé gzip:   1.19 kB[22m
[2mdist/[22m[36massets/arc-CgoEiEgM.js                           [39m[1m[2m    3.43 kB[22m[1m[22m[2m Ôöé gzip:   1.47 kB[22m
[2mdist/[22m[36massets/splunk-BtCnVYZw.js                        [39m[1m[2m    3.44 kB[22m[1m[22m[2m Ôöé gzip:   1.52 kB[22m
[2mdist/[22m[36massets/Cart-DxFZxbny.js                          [39m[1m[2m    3.51 kB[22m[1m[22m[2m Ôöé gzip:   1.18 kB[22m
[2mdist/[22m[36massets/fluent-C4IJs8-o.js                        [39m[1m[2m    3.61 kB[22m[1m[22m[2m Ôöé gzip:   0.90 kB[22m
[2mdist/[22m[36massets/ssh-config-_ykCGR6B.js                    [39m[1m[2m    3.62 kB[22m[1m[22m[2m Ôöé gzip:   1.60 kB[22m
[2mdist/[22m[36massets/jsonnet-DFQXde-d.js                       [39m[1m[2m    3.62 kB[22m[1m[22m[2m Ôöé gzip:   1.05 kB[22m
[2mdist/[22m[36massets/kdl-DV7GczEv.js                           [39m[1m[2m    3.63 kB[22m[1m[22m[2m Ôöé gzip:   1.04 kB[22m
[2mdist/[22m[36massets/glsl-DplSGwfg.js                          [39m[1m[2m    3.63 kB[22m[1m[22m[2m Ôöé gzip:   1.41 kB[22m
[2mdist/[22m[36massets/hurl-irOxFIW8.js                          [39m[1m[2m    3.65 kB[22m[1m[22m[2m Ôöé gzip:   1.16 kB[22m
[2mdist/[22m[36massets/narrat-DRg8JJMk.js                        [39m[1m[2m    3.67 kB[22m[1m[22m[2m Ôöé gzip:   1.11 kB[22m
[2mdist/[22m[36massets/turtle-BsS91CYL.js                        [39m[1m[2m    3.70 kB[22m[1m[22m[2m Ôöé gzip:   0.98 kB[22m
[2mdist/[22m[36massets/hooks-DJoAtYEm.js                         [39m[1m[2m    3.71 kB[22m[1m[22m[2m Ôöé gzip:   1.61 kB[22m
[2mdist/[22m[36massets/ProductDetails-Cr20x-0f.js                [39m[1m[2m    3.83 kB[22m[1m[22m[2m Ôöé gzip:   1.47 kB[22m
[2mdist/[22m[36massets/zenscript-DVFEvuxE.js                     [39m[1m[2m    3.91 kB[22m[1m[22m[2m Ôöé gzip:   1.28 kB[22m
[2mdist/[22m[36massets/ron-D8l8udqQ.js                           [39m[1m[2m    3.91 kB[22m[1m[22m[2m Ôöé gzip:   0.98 kB[22m
[2mdist/[22m[36massets/gn-n2N0HUVH.js                            [39m[1m[2m    4.00 kB[22m[1m[22m[2m Ôöé gzip:   1.49 kB[22m
[2mdist/[22m[36massets/pascal-D93ZcfNL.js                        [39m[1m[2m    4.15 kB[22m[1m[22m[2m Ôöé gzip:   1.67 kB[22m
[2mdist/[22m[36massets/diagram-NH7WQ7WH-CpXix_oP.js              [39m[1m[2m    4.25 kB[22m[1m[22m[2m Ôöé gzip:   1.86 kB[22m
[2mdist/[22m[36massets/tcl-dwOrl1Do.js                           [39m[1m[2m    4.43 kB[22m[1m[22m[2m Ôöé gzip:   1.52 kB[22m
[2mdist/[22m[36massets/nextflow-Zz6hmt5N.js                      [39m[1m[2m    4.51 kB[22m[1m[22m[2m Ôöé gzip:   1.17 kB[22m
[2mdist/[22m[36massets/rosmsg-BJDFO7_C.js                        [39m[1m[2m    4.52 kB[22m[1m[22m[2m Ôöé gzip:   1.06 kB[22m
[2mdist/[22m[36massets/http-jrhK8wxY.js                          [39m[1m[2m    4.55 kB[22m[1m[22m[2m Ôöé gzip:   1.12 kB[22m
[2mdist/[22m[36massets/polar-C0HS_06l.js                         [39m[1m[2m    4.67 kB[22m[1m[22m[2m Ôöé gzip:   1.12 kB[22m
[2mdist/[22m[36massets/defaultLocale-DX6XiGOO.js                 [39m[1m[2m    4.69 kB[22m[1m[22m[2m Ôöé gzip:   2.18 kB[22m
[2mdist/[22m[36massets/sdbl-DVxCFoDh.js                          [39m[1m[2m    4.70 kB[22m[1m[22m[2m Ôöé gzip:   2.01 kB[22m
[2mdist/[22m[36massets/fennel-BYunw83y.js                        [39m[1m[2m    4.77 kB[22m[1m[22m[2m Ôöé gzip:   1.53 kB[22m
[2mdist/[22m[36massets/bibtex-CHM0blh-.js                        [39m[1m[2m    4.80 kB[22m[1m[22m[2m Ôöé gzip:   0.83 kB[22m
[2mdist/[22m[36massets/llvm-DjAJT7YJ.js                          [39m[1m[2m    5.05 kB[22m[1m[22m[2m Ôöé gzip:   2.01 kB[22m
[2mdist/[22m[36massets/map-HCYkPN14.js                           [39m[1m[2m    5.07 kB[22m[1m[22m[2m Ôöé gzip:   2.07 kB[22m
[2mdist/[22m[36massets/wgsl-Dx-B1_4e.js                          [39m[1m[2m    5.14 kB[22m[1m[22m[2m Ôöé gzip:   1.39 kB[22m
[2mdist/[22m[36massets/About-BfGBtr8z.js                         [39m[1m[2m    5.16 kB[22m[1m[22m[2m Ôöé gzip:   1.64 kB[22m
[2mdist/[22m[36massets/gdresource-BOOCDP_w.js                    [39m[1m[2m    5.29 kB[22m[1m[22m[2m Ôöé gzip:   1.34 kB[22m
[2mdist/[22m[36massets/qml-3beO22l8.js                           [39m[1m[2m    5.34 kB[22m[1m[22m[2m Ôöé gzip:   1.38 kB[22m
[2mdist/[22m[36massets/zig-VOosw3JB.js                           [39m[1m[2m    5.34 kB[22m[1m[22m[2m Ôöé gzip:   1.55 kB[22m
[2mdist/[22m[36massets/dax-CEL-wOlO.js                           [39m[1m[2m    5.37 kB[22m[1m[22m[2m Ôöé gzip:   2.23 kB[22m
[2mdist/[22m[36massets/bicep-Bmn6On1c.js                         [39m[1m[2m    5.38 kB[22m[1m[22m[2m Ôöé gzip:   1.15 kB[22m
[2mdist/[22m[36massets/xml-sdJ4AIDG.js                           [39m[1m[2m    5.38 kB[22m[1m[22m[2m Ôöé gzip:   1.21 kB[22m
[2mdist/[22m[36massets/awk-DMzUqQB5.js                           [39m[1m[2m    5.46 kB[22m[1m[22m[2m Ôöé gzip:   1.38 kB[22m
[2mdist/[22m[36massets/coq-DkFqJrB1.js                           [39m[1m[2m    5.53 kB[22m[1m[22m[2m Ôöé gzip:   1.92 kB[22m
[2mdist/[22m[36massets/linear-COoAsK-U.js                        [39m[1m[2m    5.67 kB[22m[1m[22m[2m Ôöé gzip:   2.32 kB[22m
[2mdist/[22m[36massets/jinja-4LBKfQ-Z.js                         [39m[1m[2m    5.69 kB[22m[1m[22m[2m Ôöé gzip:   1.40 kB[22m
[2mdist/[22m[36massets/lean-BZvkOJ9d.js                          [39m[1m[2m    5.78 kB[22m[1m[22m[2m Ôöé gzip:   1.92 kB[22m
[2mdist/[22m[36massets/moonbit-_H4v1dQx.js                       [39m[1m[2m    5.90 kB[22m[1m[22m[2m Ôöé gzip:   1.68 kB[22m
[2mdist/[22m[36massets/powerquery-CEu0bR-o.js                    [39m[1m[2m    5.90 kB[22m[1m[22m[2m Ôöé gzip:   1.52 kB[22m
[2mdist/[22m[36massets/shaderlab-Dg9Lc6iA.js                     [39m[1m[2m    5.92 kB[22m[1m[22m[2m Ôöé gzip:   2.08 kB[22m
[2mdist/[22m[36massets/verilog-BQ8w6xss.js                       [39m[1m[2m    5.93 kB[22m[1m[22m[2m Ôöé gzip:   1.89 kB[22m
[2mdist/[22m[36massets/cypher-COkxafJQ.js                        [39m[1m[2m    5.96 kB[22m[1m[22m[2m Ôöé gzip:   1.73 kB[22m
[2mdist/[22m[36massets/Checkout-9rAZDoWQ.js                      [39m[1m[2m    6.05 kB[22m[1m[22m[2m Ôöé gzip:   2.21 kB[22m
[2mdist/[22m[36massets/diagram-WEI45ONY-0ezUFBBJ.js              [39m[1m[2m    6.08 kB[22m[1m[22m[2m Ôöé gzip:   2.61 kB[22m
[2mdist/[22m[36massets/vb-D17OF-Vu.js                            [39m[1m[2m    6.09 kB[22m[1m[22m[2m Ôöé gzip:   2.34 kB[22m
[2mdist/[22m[36massets/red-bN70gL4F.js                           [39m[1m[2m    6.26 kB[22m[1m[22m[2m Ôöé gzip:   1.60 kB[22m
[2mdist/[22m[36massets/min-dark-CafNBF8u.js                      [39m[1m[2m    6.29 kB[22m[1m[22m[2m Ôöé gzip:   1.71 kB[22m
[2mdist/[22m[36massets/gdshader-DkwncUOv.js                      [39m[1m[2m    6.33 kB[22m[1m[22m[2m Ôöé gzip:   1.73 kB[22m
[2mdist/[22m[36massets/prisma-Dd19v3D-.js                        [39m[1m[2m    6.33 kB[22m[1m[22m[2m Ôöé gzip:   1.39 kB[22m
[2mdist/[22m[36massets/pieDiagram-ENE6RG2P-BZSQFshf.js           [39m[1m[2m    6.36 kB[22m[1m[22m[2m Ôöé gzip:   2.66 kB[22m
[2mdist/[22m[36massets/ara-BRHolxvo.js                           [39m[1m[2m    6.36 kB[22m[1m[22m[2m Ôöé gzip:   1.81 kB[22m
[2mdist/[22m[36massets/clojure-P80f7IUj.js                       [39m[1m[2m    6.41 kB[22m[1m[22m[2m Ôöé gzip:   1.42 kB[22m
[2mdist/[22m[36massets/postcss-CXtECtnM.js                       [39m[1m[2m    6.42 kB[22m[1m[22m[2m Ôöé gzip:   1.91 kB[22m
[2mdist/[22m[36massets/toml-vGWfd6FD.js                          [39m[1m[2m    6.43 kB[22m[1m[22m[2m Ôöé gzip:   1.28 kB[22m
[2mdist/[22m[36massets/solarized-light-L9t79GZl.js               [39m[1m[2m    6.48 kB[22m[1m[22m[2m Ôöé gzip:   1.73 kB[22m
[2mdist/[22m[36massets/r-Dspwwk_N.js                             [39m[1m[2m    6.54 kB[22m[1m[22m[2m Ôöé gzip:   1.78 kB[22m
[2mdist/[22m[36massets/proto-C7zT0LnQ.js                         [39m[1m[2m    6.55 kB[22m[1m[22m[2m Ôöé gzip:   1.42 kB[22m
[2mdist/[22m[36massets/smalltalk-BERRCDM3.js                     [39m[1m[2m    6.59 kB[22m[1m[22m[2m Ôöé gzip:   1.62 kB[22m
[2mdist/[22m[36massets/talonscript-CkByrt1z.js                   [39m[1m[2m    6.76 kB[22m[1m[22m[2m Ôöé gzip:   1.49 kB[22m
[2mdist/[22m[36massets/solarized-dark-DXbdFlpD.js                [39m[1m[2m    6.85 kB[22m[1m[22m[2m Ôöé gzip:   1.80 kB[22m
[2mdist/[22m[36massets/riscv-BM1_JUlF.js                         [39m[1m[2m    6.91 kB[22m[1m[22m[2m Ôöé gzip:   1.98 kB[22m
[2mdist/[22m[36massets/min-light-CTRr51gU.js                     [39m[1m[2m    6.97 kB[22m[1m[22m[2m Ôöé gzip:   1.89 kB[22m
[2mdist/[22m[36massets/soy-Brmx7dQM.js                           [39m[1m[2m    6.98 kB[22m[1m[22m[2m Ôöé gzip:   1.66 kB[22m
[2mdist/[22m[36massets/scheme-C98Dy4si.js                        [39m[1m[2m    7.17 kB[22m[1m[22m[2m Ôöé gzip:   2.05 kB[22m
[2mdist/[22m[36massets/chunk-RYQCIY6F-CM1lGlRJ.js                [39m[1m[2m    7.19 kB[22m[1m[22m[2m Ôöé gzip:   2.79 kB[22m
[2mdist/[22m[36massets/hlsl-D3lLCCz7.js                          [39m[1m[2m    7.26 kB[22m[1m[22m[2m Ôöé gzip:   2.19 kB[22m
[2mdist/[22m[36massets/qss-IeuSbFQv.js                           [39m[1m[2m    7.47 kB[22m[1m[22m[2m Ôöé gzip:   2.58 kB[22m
[2mdist/[22m[36massets/dart-CF10PKvl.js                          [39m[1m[2m    7.81 kB[22m[1m[22m[2m Ôöé gzip:   1.91 kB[22m
[2mdist/[22m[36massets/systemd-4A_iFExJ.js                       [39m[1m[2m    7.87 kB[22m[1m[22m[2m Ôöé gzip:   2.55 kB[22m
[2mdist/[22m[36massets/monokai-D4h5O-jR.js                       [39m[1m[2m    7.88 kB[22m[1m[22m[2m Ôöé gzip:   1.91 kB[22m
[2mdist/[22m[36massets/Products-B48QXSMv.js                      [39m[1m[2m    7.88 kB[22m[1m[22m[2m Ôöé gzip:   2.65 kB[22m
[2mdist/[22m[36massets/regexp-CDVJQ6XC.js                        [39m[1m[2m    7.99 kB[22m[1m[22m[2m Ôöé gzip:   1.42 kB[22m
[2mdist/[22m[36massets/haml-B8DHNrY2.js                          [39m[1m[2m    8.26 kB[22m[1m[22m[2m Ôöé gzip:   1.81 kB[22m
[2mdist/[22m[36massets/typst-DHCkPAjA.js                         [39m[1m[2m    8.39 kB[22m[1m[22m[2m Ôöé gzip:   1.67 kB[22m
[2mdist/[22m[36massets/vue-html-AaS7Mt5G.js                      [39m[1m[2m    8.47 kB[22m[1m[22m[2m Ôöé gzip:   1.68 kB[22m
[2mdist/[22m[36massets/diagram-OA4YK3LP-CWU4Zxng.js              [39m[1m[2m    8.47 kB[22m[1m[22m[2m Ôöé gzip:   3.77 kB[22m
[2mdist/[22m[36massets/plsql-ChMvpjG-.js                         [39m[1m[2m    8.51 kB[22m[1m[22m[2m Ôöé gzip:   3.00 kB[22m
[2mdist/[22m[36massets/horizon-BUw7H-hv.js                       [39m[1m[2m    8.78 kB[22m[1m[22m[2m Ôöé gzip:   1.96 kB[22m
[2mdist/[22m[36massets/kotlin-BdnUsdx6.js                        [39m[1m[2m    8.79 kB[22m[1m[22m[2m Ôöé gzip:   2.13 kB[22m
[2mdist/[22m[36massets/horizon-bright-Cn-bp-IR.js                [39m[1m[2m    8.79 kB[22m[1m[22m[2m Ôöé gzip:   1.97 kB[22m
[2mdist/[22m[36massets/dagre-VKFMJZFB-cimPuR_u.js                [39m[1m[2m    8.91 kB[22m[1m[22m[2m Ôöé gzip:   3.41 kB[22m
[2mdist/[22m[36massets/ts-tags-zn1MmPIZ.js                       [39m[1m[2m    8.95 kB[22m[1m[22m[2m Ôöé gzip:   1.22 kB[22m
[2mdist/[22m[36massets/make-CHLpvVh8.js                          [39m[1m[2m    8.96 kB[22m[1m[22m[2m Ôöé gzip:   1.77 kB[22m
[2mdist/[22m[36massets/andromeeda-C4gqWexZ.js                    [39m[1m[2m    9.02 kB[22m[1m[22m[2m Ôöé gzip:   2.36 kB[22m
[2mdist/[22m[36massets/sas-cz2c8ADy.js                           [39m[1m[2m    9.06 kB[22m[1m[22m[2m Ôöé gzip:   3.81 kB[22m
[2mdist/[22m[36massets/dark-plus-C3mMm8J8.js                     [39m[1m[2m    9.10 kB[22m[1m[22m[2m Ôöé gzip:   2.10 kB[22m
[2mdist/[22m[36massets/slack-dark-BthQWCQV.js                    [39m[1m[2m    9.12 kB[22m[1m[22m[2m Ôöé gzip:   1.97 kB[22m
[2mdist/[22m[36massets/sass-Cj5Yp3dK.js                          [39m[1m[2m    9.29 kB[22m[1m[22m[2m Ôöé gzip:   2.49 kB[22m
[2mdist/[22m[36massets/plastic-3e1v2bzS.js                       [39m[1m[2m    9.30 kB[22m[1m[22m[2m Ôöé gzip:   1.98 kB[22m
[2mdist/[22m[36massets/slack-ochin-DqwNpetd.js                   [39m[1m[2m    9.43 kB[22m[1m[22m[2m Ôöé gzip:   2.10 kB[22m
[2mdist/[22m[36massets/tex-idrVyKtj.js                           [39m[1m[2m    9.67 kB[22m[1m[22m[2m Ôöé gzip:   3.06 kB[22m
[2mdist/[22m[36massets/jison-wvAkD_A8.js                         [39m[1m[2m    9.69 kB[22m[1m[22m[2m Ôöé gzip:   1.85 kB[22m
[2mdist/[22m[36massets/cmake-D1j8_8rp.js                         [39m[1m[2m    9.86 kB[22m[1m[22m[2m Ôöé gzip:   3.37 kB[22m
[2mdist/[22m[36massets/light-plus-B7mTdjB0.js                    [39m[1m[2m    9.94 kB[22m[1m[22m[2m Ôöé gzip:   2.27 kB[22m
[2mdist/[22m[36massets/hcl-BWvSN4gD.js                           [39m[1m[2m   10.05 kB[22m[1m[22m[2m Ôöé gzip:   1.93 kB[22m
[2mdist/[22m[36massets/cynefinDiagram-TSTJHNR4-DUbICwDt.js       [39m[1m[2m   10.10 kB[22m[1m[22m[2m Ôöé gzip:   3.64 kB[22m
[2mdist/[22m[36massets/pkl-u5AG7uiY.js                           [39m[1m[2m   10.37 kB[22m[1m[22m[2m Ôöé gzip:   1.38 kB[22m
[2mdist/[22m[36massets/beancount-k_qm7-4y.js                     [39m[1m[2m   10.37 kB[22m[1m[22m[2m Ôöé gzip:   1.44 kB[22m
[2mdist/[22m[36massets/nextflow-groovy-BeH2EWoN.js               [39m[1m[2m   10.41 kB[22m[1m[22m[2m Ôöé gzip:   2.13 kB[22m
[2mdist/[22m[36massets/stateDiagram-2N3HPSRC-BtcE4fRk.js         [39m[1m[2m   10.43 kB[22m[1m[22m[2m Ôöé gzip:   3.66 kB[22m
[2mdist/[22m[36massets/dream-maker-BtqSS_iP.js                   [39m[1m[2m   10.47 kB[22m[1m[22m[2m Ôöé gzip:   2.25 kB[22m
[2mdist/[22m[36massets/raku-DXvB9xmW.js                          [39m[1m[2m   10.47 kB[22m[1m[22m[2m Ôöé gzip:   2.94 kB[22m
[2mdist/[22m[36massets/yaml-Buea-lGh.js                          [39m[1m[2m   10.51 kB[22m[1m[22m[2m Ôöé gzip:   2.27 kB[22m
[2mdist/[22m[36massets/rst-BrH8l1NY.js                           [39m[1m[2m   10.67 kB[22m[1m[22m[2m Ôöé gzip:   2.42 kB[22m
[2mdist/[22m[36massets/diagram-FQU43EPY-ATDIyuIN.js              [39m[1m[2m   10.83 kB[22m[1m[22m[2m Ôöé gzip:   4.18 kB[22m
[2mdist/[22m[36massets/elm-DbKCFpqz.js                           [39m[1m[2m   10.97 kB[22m[1m[22m[2m Ôöé gzip:   2.12 kB[22m
[2mdist/[22m[36massets/just-Cw27pwNe.js                          [39m[1m[2m   11.16 kB[22m[1m[22m[2m Ôöé gzip:   2.78 kB[22m
[2mdist/[22m[36massets/github-light-DAi9KRSo.js                  [39m[1m[2m   11.18 kB[22m[1m[22m[2m Ôöé gzip:   2.51 kB[22m
[2mdist/[22m[36massets/prolog-CbFg5uaA.js                        [39m[1m[2m   11.36 kB[22m[1m[22m[2m Ôöé gzip:   3.83 kB[22m
[2mdist/[22m[36massets/terraform-BETggiCN.js                     [39m[1m[2m   11.39 kB[22m[1m[22m[2m Ôöé gzip:   2.51 kB[22m
[2mdist/[22m[36massets/github-dark-DHJKELXO.js                   [39m[1m[2m   11.41 kB[22m[1m[22m[2m Ôöé gzip:   2.55 kB[22m
[2mdist/[22m[36massets/puppet-BMWR74SV.js                        [39m[1m[2m   11.44 kB[22m[1m[22m[2m Ôöé gzip:   2.11 kB[22m
[2mdist/[22m[36massets/laserwave-DUszq2jm.js                     [39m[1m[2m   11.50 kB[22m[1m[22m[2m Ôöé gzip:   2.58 kB[22m
[2mdist/[22m[36massets/gherkin-DyxjwDmM.js                       [39m[1m[2m   11.95 kB[22m[1m[22m[2m Ôöé gzip:   5.05 kB[22m
[2mdist/[22m[36massets/wasm-MzD3tlZU.js                          [39m[1m[2m   12.01 kB[22m[1m[22m[2m Ôöé gzip:   2.19 kB[22m
[2mdist/[22m[36massets/hjson-D5-asLiD.js                         [39m[1m[2m   12.05 kB[22m[1m[22m[2m Ôöé gzip:   1.64 kB[22m
[2mdist/[22m[36massets/handlebars-BL8al0AC.js                    [39m[1m[2m   12.15 kB[22m[1m[22m[2m Ôöé gzip:   2.38 kB[22m
[2mdist/[22m[36massets/apache-Pmp26Uib.js                        [39m[1m[2m   12.46 kB[22m[1m[22m[2m Ôöé gzip:   3.72 kB[22m
[2mdist/[22m[36massets/vesper-DU1UobuO.js                        [39m[1m[2m   12.69 kB[22m[1m[22m[2m Ôöé gzip:   1.97 kB[22m
[2mdist/[22m[36massets/bat-BkioyH1T.js                           [39m[1m[2m   12.89 kB[22m[1m[22m[2m Ôöé gzip:   3.22 kB[22m
[2mdist/[22m[36massets/fish-BvzEVeQv.js                          [39m[1m[2m   13.04 kB[22m[1m[22m[2m Ôöé gzip:   1.74 kB[22m
[2mdist/[22m[36massets/v-BcVCzyr7.js                             [39m[1m[2m   13.21 kB[22m[1m[22m[2m Ôöé gzip:   2.74 kB[22m
[2mdist/[22m[36massets/vitesse-light-CVO1_9PV.js                 [39m[1m[2m   13.62 kB[22m[1m[22m[2m Ôöé gzip:   3.04 kB[22m
[2mdist/[22m[36massets/aurora-x-D-2ljcwZ.js                      [39m[1m[2m   13.66 kB[22m[1m[22m[2m Ôöé gzip:   2.28 kB[22m
[2mdist/[22m[36massets/vitesse-black-Bkuqu6BP.js                 [39m[1m[2m   13.68 kB[22m[1m[22m[2m Ôöé gzip:   3.06 kB[22m
[2mdist/[22m[36massets/vitesse-dark-D0r3Knsf.js                  [39m[1m[2m   13.76 kB[22m[1m[22m[2m Ôöé gzip:   3.06 kB[22m
[2mdist/[22m[36massets/pug-CGlum2m_.js                           [39m[1m[2m   13.84 kB[22m[1m[22m[2m Ôöé gzip:   2.58 kB[22m
[2mdist/[22m[36massets/luau-C-HG3fhB.js                          [39m[1m[2m   13.96 kB[22m[1m[22m[2m Ôöé gzip:   3.18 kB[22m
[2mdist/[22m[36massets/synthwave-84-CbfX1IO0.js                  [39m[1m[2m   14.04 kB[22m[1m[22m[2m Ôöé gzip:   2.87 kB[22m
[2mdist/[22m[36massets/github-light-default-D7oLnXFd.js          [39m[1m[2m   14.16 kB[22m[1m[22m[2m Ôöé gzip:   3.04 kB[22m
[2mdist/[22m[36massets/clarity-D53aC0YG.js                       [39m[1m[2m   14.28 kB[22m[1m[22m[2m Ôöé gzip:   2.46 kB[22m
[2mdist/[22m[36massets/github-light-high-contrast-BfjtVDDH.js    [39m[1m[2m   14.28 kB[22m[1m[22m[2m Ôöé gzip:   3.02 kB[22m
[2mdist/[22m[36massets/github-dark-dimmed-DH5Ifo-i.js            [39m[1m[2m   14.43 kB[22m[1m[22m[2m Ôöé gzip:   3.13 kB[22m
[2mdist/[22m[36massets/github-dark-default-Cuk6v7N8.js           [39m[1m[2m   14.44 kB[22m[1m[22m[2m Ôöé gzip:   3.13 kB[22m
[2mdist/[22m[36massets/github-dark-high-contrast-E3gJ1_iC.js     [39m[1m[2m   14.60 kB[22m[1m[22m[2m Ôöé gzip:   3.09 kB[22m
[2mdist/[22m[36massets/gnuplot-DdkO51Og.js                       [39m[1m[2m   14.78 kB[22m[1m[22m[2m Ôöé gzip:   3.27 kB[22m
[2mdist/[22m[36massets/Home-C3yUFSsj.js                          [39m[1m[2m   15.03 kB[22m[1m[22m[2m Ôöé gzip:   4.96 kB[22m
[2mdist/[22m[36massets/rust-B1yitclQ.js                          [39m[1m[2m   15.07 kB[22m[1m[22m[2m Ôöé gzip:   2.72 kB[22m
[2mdist/[22m[36massets/kusto-DZf3V79B.js                         [39m[1m[2m   15.17 kB[22m[1m[22m[2m Ôöé gzip:   3.92 kB[22m
[2mdist/[22m[36massets/actionscript-3-CoDkCxhg.js                [39m[1m[2m   15.21 kB[22m[1m[22m[2m Ôöé gzip:   2.66 kB[22m
[2mdist/[22m[36massets/nix-CwoSXNpI.js                           [39m[1m[2m   15.51 kB[22m[1m[22m[2m Ôöé gzip:   2.48 kB[22m
[2mdist/[22m[36massets/lua-BaeVxFsk.js                           [39m[1m[2m   15.54 kB[22m[1m[22m[2m Ôöé gzip:   3.16 kB[22m
[2mdist/[22m[36massets/chunk-MOJQB5TN-P9IYpDp8.js                [39m[1m[2m   15.76 kB[22m[1m[22m[2m Ôöé gzip:   4.43 kB[22m
[2mdist/[22m[36massets/abap-BdImnpbu.js                          [39m[1m[2m   15.85 kB[22m[1m[22m[2m Ôöé gzip:   5.91 kB[22m
[2mdist/[22m[36massets/solidity-rGO070M0.js                      [39m[1m[2m   16.07 kB[22m[1m[22m[2m Ôöé gzip:   3.11 kB[22m
[2mdist/[22m[36massets/diagram-G47NLZAW-B2zBZBom.js              [39m[1m[2m   16.08 kB[22m[1m[22m[2m Ôöé gzip:   5.74 kB[22m
[2mdist/[22m[36massets/matlab-D7o27uSR.js                        [39m[1m[2m   16.09 kB[22m[1m[22m[2m Ôöé gzip:   3.06 kB[22m
[2mdist/[22m[36massets/cue-D82EKSYY.js                           [39m[1m[2m   16.20 kB[22m[1m[22m[2m Ôöé gzip:   2.06 kB[22m
[2mdist/[22m[36massets/elixir-CDX3lj18.js                        [39m[1m[2m   16.32 kB[22m[1m[22m[2m Ôöé gzip:   2.80 kB[22m
[2mdist/[22m[36massets/odin-BBf5iR-q.js                          [39m[1m[2m   16.51 kB[22m[1m[22m[2m Ôöé gzip:   2.94 kB[22m
[2mdist/[22m[36massets/bird2-DPOp833l.js                         [39m[1m[2m   16.97 kB[22m[1m[22m[2m Ôöé gzip:   3.85 kB[22m
[2mdist/[22m[36massets/kanagawa-wave-DWedfzmr.js                 [39m[1m[2m   17.12 kB[22m[1m[22m[2m Ôöé gzip:   2.93 kB[22m
[2mdist/[22m[36massets/kanagawa-lotus-CfQXZHmo.js                [39m[1m[2m   17.13 kB[22m[1m[22m[2m Ôöé gzip:   2.93 kB[22m
[2mdist/[22m[36massets/kanagawa-dragon-CkXjmgJE.js               [39m[1m[2m   17.13 kB[22m[1m[22m[2m Ôöé gzip:   2.95 kB[22m
[2mdist/[22m[36massets/move-IF9eRakj.js                          [39m[1m[2m   17.51 kB[22m[1m[22m[2m Ôöé gzip:   3.07 kB[22m
[2mdist/[22m[36massets/ishikawaDiagram-FXEZZL3T-D0J0qmfm.js      [39m[1m[2m   17.57 kB[22m[1m[22m[2m Ôöé gzip:   6.68 kB[22m
[2mdist/[22m[36massets/graphql-ChdNCCLP.js                       [39m[1m[2m   18.00 kB[22m[1m[22m[2m Ôöé gzip:   2.52 kB[22m
[2mdist/[22m[36massets/liquid-DYVedYrR.js                        [39m[1m[2m   18.09 kB[22m[1m[22m[2m Ôöé gzip:   3.16 kB[22m
[2mdist/[22m[36massets/svelte-C_ipcX3V.js                        [39m[1m[2m   18.24 kB[22m[1m[22m[2m Ôöé gzip:   3.14 kB[22m
[2mdist/[22m[36massets/material-theme-D5KoaKCx.js                [39m[1m[2m   18.62 kB[22m[1m[22m[2m Ôöé gzip:   3.11 kB[22m
[2mdist/[22m[36massets/material-theme-darker-BfHTSMKl.js         [39m[1m[2m   18.63 kB[22m[1m[22m[2m Ôöé gzip:   3.11 kB[22m
[2mdist/[22m[36massets/material-theme-ocean-CyktbL80.js          [39m[1m[2m   18.63 kB[22m[1m[22m[2m Ôöé gzip:   3.14 kB[22m
[2mdist/[22m[36massets/material-theme-lighter-B0m2ddpp.js        [39m[1m[2m   18.63 kB[22m[1m[22m[2m Ôöé gzip:   3.11 kB[22m
[2mdist/[22m[36massets/material-theme-palenight-Csfq5Kiy.js      [39m[1m[2m   18.64 kB[22m[1m[22m[2m Ôöé gzip:   3.13 kB[22m
[2mdist/[22m[36massets/gdscript-C5YyOfLZ.js                      [39m[1m[2m   18.99 kB[22m[1m[22m[2m Ôöé gzip:   3.75 kB[22m
[2mdist/[22m[36massets/groovy-gcz8RCvz.js                        [39m[1m[2m   19.18 kB[22m[1m[22m[2m Ôöé gzip:   3.60 kB[22m
[2mdist/[22m[36massets/mdc-BMNejdWA.js                           [39m[1m[2m   19.63 kB[22m[1m[22m[2m Ôöé gzip:   6.66 kB[22m
[2mdist/[22m[36massets/glimmer-js-Rg0-pVw9.js                    [39m[1m[2m   20.07 kB[22m[1m[22m[2m Ôöé gzip:   2.95 kB[22m
[2mdist/[22m[36massets/glimmer-ts-U6CK756n.js                    [39m[1m[2m   20.07 kB[22m[1m[22m[2m Ôöé gzip:   2.94 kB[22m
[2mdist/[22m[36massets/ayu-dark-DYE7WIF3.js                      [39m[1m[2m   20.08 kB[22m[1m[22m[2m Ôöé gzip:   3.94 kB[22m
[2mdist/[22m[36massets/ayu-mirage-32ctXXKs.js                    [39m[1m[2m   20.09 kB[22m[1m[22m[2m Ôöé gzip:   3.94 kB[22m
[2mdist/[22m[36massets/powershell-Dpen1YoG.js                    [39m[1m[2m   20.15 kB[22m[1m[22m[2m Ôöé gzip:   4.07 kB[22m
[2mdist/[22m[36massets/ayu-light-BA47KaF1.js                     [39m[1m[2m   20.15 kB[22m[1m[22m[2m Ôöé gzip:   3.93 kB[22m
[2mdist/[22m[36massets/viml-CJc9bBzg.js                          [39m[1m[2m   20.37 kB[22m[1m[22m[2m Ôöé gzip:   6.73 kB[22m
[2mdist/[22m[36massets/nushell-Cz2AlsmD.js                       [39m[1m[2m   20.41 kB[22m[1m[22m[2m Ôöé gzip:   5.22 kB[22m
[2mdist/[22m[36massets/kanban-definition-HUTT4EX6-CBB9eWr3.js    [39m[1m[2m   20.70 kB[22m[1m[22m[2m Ôöé gzip:   7.30 kB[22m
[2mdist/[22m[36massets/snazzy-light-Bw305WKR.js                  [39m[1m[2m   20.77 kB[22m[1m[22m[2m Ôöé gzip:   3.83 kB[22m
[2mdist/[22m[36massets/dracula-BzJJZx-M.js                       [39m[1m[2m   21.07 kB[22m[1m[22m[2m Ôöé gzip:   4.00 kB[22m
[2mdist/[22m[36massets/dracula-soft-BXkSAIEj.js                  [39m[1m[2m   21.08 kB[22m[1m[22m[2m Ôöé gzip:   4.04 kB[22m
[2mdist/[22m[36massets/twig-DNn4PbVi.js                          [39m[1m[2m   21.36 kB[22m[1m[22m[2m Ôöé gzip:   3.87 kB[22m
[2mdist/[22m[36massets/wit-5i3qLPDT.js                           [39m[1m[2m   21.47 kB[22m[1m[22m[2m Ôöé gzip:   2.89 kB[22m
[2mdist/[22m[36massets/rose-pine-qdsjHGoJ.js                     [39m[1m[2m   21.74 kB[22m[1m[22m[2m Ôöé gzip:   3.87 kB[22m
[2mdist/[22m[36massets/rose-pine-moon-D4_iv3hh.js                [39m[1m[2m   21.75 kB[22m[1m[22m[2m Ôöé gzip:   3.89 kB[22m
[2mdist/[22m[36massets/rose-pine-dawn-DHQR4-dF.js                [39m[1m[2m   21.75 kB[22m[1m[22m[2m Ôöé gzip:   3.89 kB[22m
[2mdist/[22m[36massets/nim-CVrawwO9.js                           [39m[1m[2m   22.46 kB[22m[1m[22m[2m Ôöé gzip:   3.16 kB[22m
[2mdist/[22m[36massets/common-lisp-Cg-RD9OK.js                   [39m[1m[2m   22.58 kB[22m[1m[22m[2m Ôöé gzip:   6.06 kB[22m
[2mdist/[22m[36massets/surrealql-Bq5Q-fJD.js                     [39m[1m[2m   22.58 kB[22m[1m[22m[2m Ôöé gzip:   4.32 kB[22m
[2mdist/[22m[36massets/gruvbox-dark-hard-CFHQjOhq.js             [39m[1m[2m   22.63 kB[22m[1m[22m[2m Ôöé gzip:   4.18 kB[22m
[2mdist/[22m[36massets/gruvbox-dark-soft-CVdnzihN.js             [39m[1m[2m   22.63 kB[22m[1m[22m[2m Ôöé gzip:   4.17 kB[22m
[2mdist/[22m[36massets/gruvbox-light-hard-CH1njM8p.js            [39m[1m[2m   22.64 kB[22m[1m[22m[2m Ôöé gzip:   4.18 kB[22m
[2mdist/[22m[36massets/gruvbox-light-soft-hJgmCMqR.js            [39m[1m[2m   22.64 kB[22m[1m[22m[2m Ôöé gzip:   4.18 kB[22m
[2mdist/[22m[36massets/gruvbox-dark-medium-GsRaNv29.js           [39m[1m[2m   22.64 kB[22m[1m[22m[2m Ôöé gzip:   4.18 kB[22m
[2mdist/[22m[36massets/gruvbox-light-medium-DRw_LuNl.js          [39m[1m[2m   22.64 kB[22m[1m[22m[2m Ôöé gzip:   4.18 kB[22m
[2mdist/[22m[36massets/mindmap-definition-LN4V7U3C-j_Z4gx8y.js   [39m[1m[2m   23.36 kB[22m[1m[22m[2m Ôöé gzip:   7.90 kB[22m
[2mdist/[22m[36massets/sankeyDiagram-HTMAVEWB-QQ_9I1M2.js        [39m[1m[2m   23.39 kB[22m[1m[22m[2m Ôöé gzip:   8.58 kB[22m
[2mdist/[22m[36massets/sql-BLtJtn59.js                           [39m[1m[2m   23.41 kB[22m[1m[22m[2m Ôöé gzip:   7.40 kB[22m
[2mdist/[22m[36massets/journeyDiagram-5HDEW3XC-D2gaa1ad.js       [39m[1m[2m   23.59 kB[22m[1m[22m[2m Ôöé gzip:   8.36 kB[22m
[2mdist/[22m[36massets/cadence-Bv_4Rxtq.js                       [39m[1m[2m   23.67 kB[22m[1m[22m[2m Ôöé gzip:   3.67 kB[22m
[2mdist/[22m[36massets/graph-Cxex4V9Y.js                         [39m[1m[2m   23.94 kB[22m[1m[22m[2m Ôöé gzip:   8.32 kB[22m
[2mdist/[22m[36massets/astro-CbQHKStN.js                         [39m[1m[2m   24.01 kB[22m[1m[22m[2m Ôöé gzip:   7.54 kB[22m
[2mdist/[22m[36massets/typespec-BGHnOYBU.js                      [39m[1m[2m   24.02 kB[22m[1m[22m[2m Ôöé gzip:   2.59 kB[22m
[2mdist/[22m[36massets/apl-dKokRX4l.js                           [39m[1m[2m   24.04 kB[22m[1m[22m[2m Ôöé gzip:   4.20 kB[22m
[2mdist/[22m[36massets/templ-P3uqSqPl.js                         [39m[1m[2m   24.06 kB[22m[1m[22m[2m Ôöé gzip:   5.40 kB[22m
[2mdist/[22m[36massets/vhdl-CeAyd5Ju.js                          [39m[1m[2m   24.26 kB[22m[1m[22m[2m Ôöé gzip:   3.87 kB[22m
[2mdist/[22m[36massets/angular-html-CU67Zn6k.js                  [39m[1m[2m   24.29 kB[22m[1m[22m[2m Ôöé gzip:   4.01 kB[22m
[2mdist/[22m[36massets/vue-DN_0RTcg.js                           [39m[1m[2m   24.48 kB[22m[1m[22m[2m Ôöé gzip:   2.97 kB[22m
[2mdist/[22m[36massets/purescript-CklMAg4u.js                    [39m[1m[2m   24.69 kB[22m[1m[22m[2m Ôöé gzip:   3.25 kB[22m
[2mdist/[22m[36massets/one-light-C3Wv6jpd.js                     [39m[1m[2m   25.30 kB[22m[1m[22m[2m Ôöé gzip:   3.67 kB[22m
[2mdist/[22m[36massets/fsharp-CXgrBDvD.js                        [39m[1m[2m   25.31 kB[22m[1m[22m[2m Ôöé gzip:   4.13 kB[22m
[2mdist/[22m[36massets/marko-CnJfTvn9.js                         [39m[1m[2m   25.48 kB[22m[1m[22m[2m Ôöé gzip:   3.59 kB[22m
[2mdist/[22m[36massets/c3-eo99z4R2.js                            [39m[1m[2m   25.63 kB[22m[1m[22m[2m Ôöé gzip:   3.87 kB[22m
[2mdist/[22m[36massets/night-owl-light-CMTm3GFP.js               [39m[1m[2m   25.90 kB[22m[1m[22m[2m Ôöé gzip:   4.26 kB[22m
[2mdist/[22m[36massets/wardleyDiagram-EHGQE667-Cdz6Y2z0.js       [39m[1m[2m   26.10 kB[22m[1m[22m[2m Ôöé gzip:   6.95 kB[22m
[2mdist/[22m[36massets/system-verilog-CnnmHF94.js                [39m[1m[2m   26.20 kB[22m[1m[22m[2m Ôöé gzip:   4.85 kB[22m
[2mdist/[22m[36massets/nord-Ddv68eIx.js                          [39m[1m[2m   26.72 kB[22m[1m[22m[2m Ôöé gzip:   4.40 kB[22m
[2mdist/[22m[36massets/codeql-DsOJ9woJ.js                        [39m[1m[2m   26.88 kB[22m[1m[22m[2m Ôöé gzip:   3.79 kB[22m
[2mdist/[22m[36massets/scss-OYdSNvt2.js                          [39m[1m[2m   27.20 kB[22m[1m[22m[2m Ôöé gzip:   4.20 kB[22m
[2mdist/[22m[36massets/erDiagram-Q63AITRT-BMi_fN2f.js            [39m[1m[2m   27.22 kB[22m[1m[22m[2m Ôöé gzip:   9.46 kB[22m
[2mdist/[22m[36massets/java-CylS5w8V.js                          [39m[1m[2m   27.22 kB[22m[1m[22m[2m Ôöé gzip:   4.26 kB[22m
[2mdist/[22m[36massets/coffee-Ch7k5sss.js                        [39m[1m[2m   27.42 kB[22m[1m[22m[2m Ôöé gzip:   6.35 kB[22m
[2mdist/[22m[36massets/razor-Uh8Bk_45.js                         [39m[1m[2m   27.51 kB[22m[1m[22m[2m Ôöé gzip:   3.57 kB[22m
[2mdist/[22m[36massets/scala-C151Ov-r.js                         [39m[1m[2m   28.88 kB[22m[1m[22m[2m Ôöé gzip:   3.94 kB[22m
[2mdist/[22m[36massets/night-owl-C39BiMTA.js                     [39m[1m[2m   28.91 kB[22m[1m[22m[2m Ôöé gzip:   5.16 kB[22m
[2mdist/[22m[36massets/crystal-tKQVLTB8.js                       [39m[1m[2m   29.39 kB[22m[1m[22m[2m Ôöé gzip:   4.44 kB[22m
[2mdist/[22m[36massets/mermaid-mWjccvbQ.js                       [39m[1m[2m   29.51 kB[22m[1m[22m[2m Ôöé gzip:   3.66 kB[22m
[2mdist/[22m[36massets/applescript-Co6uUVPk.js                   [39m[1m[2m   29.57 kB[22m[1m[22m[2m Ôöé gzip:   5.93 kB[22m
[2mdist/[22m[36massets/gitGraphDiagram-IHSO6WYX-BPNVLo0h.js      [39m[1m[2m   29.94 kB[22m[1m[22m[2m Ôöé gzip:   8.88 kB[22m
[2mdist/[22m[36massets/layout-CCRaGWf7.js                        [39m[1m[2m   31.00 kB[22m[1m[22m[2m Ôöé gzip:  11.19 kB[22m
[2mdist/[22m[36massets/julia-CxzCAyBv.js                         [39m[1m[2m   31.07 kB[22m[1m[22m[2m Ôöé gzip:   4.33 kB[22m
[2mdist/[22m[36massets/stylus-BEDo0Tqx.js                        [39m[1m[2m   31.07 kB[22m[1m[22m[2m Ôöé gzip:   7.99 kB[22m
[2mdist/[22m[36massets/requirementDiagram-TGXJPOKE-C8-IL3_o.js   [39m[1m[2m   31.21 kB[22m[1m[22m[2m Ôöé gzip:   9.83 kB[22m
[2mdist/[22m[36massets/timeline-definition-FHXFAJF6-X0Ye4-CQ.js  [39m[1m[2m   31.36 kB[22m[1m[22m[2m Ôöé gzip:  10.44 kB[22m
[2mdist/[22m[36massets/poimandres-CS3Unz2-.js                    [39m[1m[2m   33.49 kB[22m[1m[22m[2m Ôöé gzip:   5.50 kB[22m
[2mdist/[22m[36massets/one-dark-pro-DVMEJ2y_.js                  [39m[1m[2m   33.79 kB[22m[1m[22m[2m Ôöé gzip:   5.52 kB[22m
[2mdist/[22m[36massets/bsl-BO_Y6i37.js                           [39m[1m[2m   33.87 kB[22m[1m[22m[2m Ôöé gzip:   8.35 kB[22m
[2mdist/[22m[36massets/quadrantDiagram-ABIIQ3AL-NuD7cIWJ.js      [39m[1m[2m   34.49 kB[22m[1m[22m[2m Ôöé gzip:  10.14 kB[22m
[2mdist/[22m[36massets/haxe-CzTSHFRz.js                          [39m[1m[2m   35.16 kB[22m[1m[22m[2m Ôöé gzip:   5.91 kB[22m
[2mdist/[22m[36massets/nginx-BpAMiNFr.js                         [39m[1m[2m   35.37 kB[22m[1m[22m[2m Ôöé gzip:   4.43 kB[22m
[2mdist/[22m[36massets/houston-DnULxvSX.js                       [39m[1m[2m   35.42 kB[22m[1m[22m[2m Ôöé gzip:   5.78 kB[22m
[2mdist/[22m[36massets/tokyo-night-hegEt444.js                   [39m[1m[2m   35.67 kB[22m[1m[22m[2m Ôöé gzip:   6.24 kB[22m
[2mdist/[22m[36massets/erlang-DsQrWhSR.js                        [39m[1m[2m   37.48 kB[22m[1m[22m[2m Ôöé gzip:   4.40 kB[22m
[2mdist/[22m[36massets/chunk-EX3LRPZG-DoH2-4Gp.js                [39m[1m[2m   38.63 kB[22m[1m[22m[2m Ôöé gzip:  12.69 kB[22m
[2mdist/[22m[36massets/cobol-nwyudZeR.js                         [39m[1m[2m   39.15 kB[22m[1m[22m[2m Ôöé gzip:  10.87 kB[22m
[2mdist/[22m[36massets/asm-D_Q5rh1f.js                           [39m[1m[2m   40.72 kB[22m[1m[22m[2m Ôöé gzip:   8.21 kB[22m
[2mdist/[22m[36massets/shellscript-Yzrsuije.js                   [39m[1m[2m   41.48 kB[22m[1m[22m[2m Ôöé gzip:   6.09 kB[22m
[2mdist/[22m[36massets/haskell-Df6bDoY_.js                       [39m[1m[2m   41.49 kB[22m[1m[22m[2m Ôöé gzip:   6.44 kB[22m
[2mdist/[22m[36massets/xychartDiagram-FW5EYKEG-CThsFI_E.js       [39m[1m[2m   41.93 kB[22m[1m[22m[2m Ôöé gzip:  12.06 kB[22m
[2mdist/[22m[36massets/vennDiagram-L72KCM5P-BuuCI1Dj.js          [39m[1m[2m   42.37 kB[22m[1m[22m[2m Ôöé gzip:  15.80 kB[22m
[2mdist/[22m[36massets/perl-C0TMdlhV.js                          [39m[1m[2m   43.16 kB[22m[1m[22m[2m Ôöé gzip:   4.67 kB[22m
[2mdist/[22m[36massets/d-85-TOEBH.js                             [39m[1m[2m   43.80 kB[22m[1m[22m[2m Ôöé gzip:   8.47 kB[22m
[2mdist/[22m[36massets/ruby-Dw2BHqvy.js                          [39m[1m[2m   45.95 kB[22m[1m[22m[2m Ôöé gzip:   5.68 kB[22m
[2mdist/[22m[36massets/go-CxLEBnE3.js                            [39m[1m[2m   46.81 kB[22m[1m[22m[2m Ôöé gzip:   5.18 kB[22m
[2mdist/[22m[36massets/apex-D8_7TLub.js                          [39m[1m[2m   46.99 kB[22m[1m[22m[2m Ôöé gzip:   6.77 kB[22m
[2mdist/[22m[36massets/catppuccin-mocha-D87Tk5Gz.js              [39m[1m[2m   47.26 kB[22m[1m[22m[2m Ôöé gzip:   8.00 kB[22m
[2mdist/[22m[36massets/catppuccin-latte-C9dUb6Cb.js              [39m[1m[2m   47.26 kB[22m[1m[22m[2m Ôöé gzip:   8.00 kB[22m
[2mdist/[22m[36massets/catppuccin-frappe-DFWUc33u.js             [39m[1m[2m   47.26 kB[22m[1m[22m[2m Ôöé gzip:   8.02 kB[22m
[2mdist/[22m[36massets/catppuccin-macchiato-DQyhUUbL.js          [39m[1m[2m   47.26 kB[22m[1m[22m[2m Ôöé gzip:   8.01 kB[22m
[2mdist/[22m[36massets/ada-bCR0ucgS.js                           [39m[1m[2m   48.08 kB[22m[1m[22m[2m Ôöé gzip:   6.03 kB[22m
[2mdist/[22m[36massets/css-DPfMkruS.js                           [39m[1m[2m   49.02 kB[22m[1m[22m[2m Ôöé gzip:  11.85 kB[22m
[2mdist/[22m[36massets/chunk-V7JOEXUC-DozMYdNN.js                [39m[1m[2m   49.30 kB[22m[1m[22m[2m Ôöé gzip:  15.79 kB[22m
[2mdist/[22m[36massets/imba-DGztddWO.js                          [39m[1m[2m   49.93 kB[22m[1m[22m[2m Ôöé gzip:   9.46 kB[22m
[2mdist/[22m[36massets/everforest-dark-BgDCqdQA.js               [39m[1m[2m   53.75 kB[22m[1m[22m[2m Ôöé gzip:   8.42 kB[22m
[2mdist/[22m[36massets/everforest-light-C8M2exoo.js              [39m[1m[2m   53.75 kB[22m[1m[22m[2m Ôöé gzip:   8.42 kB[22m
[2mdist/[22m[36massets/wikitext-BhOHFoWU.js                      [39m[1m[2m   55.89 kB[22m[1m[22m[2m Ôöé gzip:   4.76 kB[22m
[2mdist/[22m[36massets/stata-BH5u7GGu.js                         [39m[1m[2m   56.99 kB[22m[1m[22m[2m Ôöé gzip:  12.36 kB[22m
[2mdist/[22m[36massets/html-GMplVEZG.js                          [39m[1m[2m   57.25 kB[22m[1m[22m[2m Ôöé gzip:  11.69 kB[22m
[2mdist/[22m[36massets/ballerina-BFfxhgS-.js                     [39m[1m[2m   58.69 kB[22m[1m[22m[2m Ôöé gzip:   8.15 kB[22m
[2mdist/[22m[36massets/markdown-Cvjx9yec.js                      [39m[1m[2m   59.34 kB[22m[1m[22m[2m Ôöé gzip:   5.64 kB[22m
[2mdist/[22m[36massets/flowDiagram-23GEKE2U-Bn0QdGyV.js          [39m[1m[2m   61.40 kB[22m[1m[22m[2m Ôöé gzip:  19.68 kB[22m
[2mdist/[22m[36massets/ocaml-C0hk2d4L.js                         [39m[1m[2m   62.45 kB[22m[1m[22m[2m Ôöé gzip:   5.02 kB[22m
[2mdist/[22m[36massets/ganttDiagram-NO4QXBWP-CQf6WPOg.js         [39m[1m[2m   69.66 kB[22m[1m[22m[2m Ôöé gzip:  23.55 kB[22m
[2mdist/[22m[36massets/mojo-rZm6bMo-.js                          [39m[1m[2m   69.80 kB[22m[1m[22m[2m Ôöé gzip:   9.27 kB[22m
[2mdist/[22m[36massets/python-B6aJPvgy.js                        [39m[1m[2m   69.95 kB[22m[1m[22m[2m Ôöé gzip:   9.13 kB[22m
[2mdist/[22m[36massets/c4Diagram-LMCZKHZV-Jd_r5Zrb.js            [39m[1m[2m   69.97 kB[22m[1m[22m[2m Ôöé gzip:  19.65 kB[22m
[2mdist/[22m[36massets/c-BIGW1oBm.js                             [39m[1m[2m   72.11 kB[22m[1m[22m[2m Ôöé gzip:  10.51 kB[22m
[2mdist/[22m[36massets/latex-CWtU0Tv5.js                         [39m[1m[2m   72.64 kB[22m[1m[22m[2m Ôöé gzip:   6.72 kB[22m
[2mdist/[22m[36massets/vyper-CDx5xZoG.js                         [39m[1m[2m   74.65 kB[22m[1m[22m[2m Ôöé gzip:  10.74 kB[22m
[2mdist/[22m[36massets/blockDiagram-677ZJIJ3-D2QB5r3p.js         [39m[1m[2m   75.13 kB[22m[1m[22m[2m Ôöé gzip:  21.61 kB[22m
[2mdist/[22m[36massets/hack-CaT9iCJl.js                          [39m[1m[2m   80.24 kB[22m[1m[22m[2m Ôöé gzip:  26.21 kB[22m
[2mdist/[22m[36massets/cose-bilkent-JH36ORCC-CHQZ7VfU.js         [39m[1m[2m   81.62 kB[22m[1m[22m[2m Ôöé gzip:  22.48 kB[22m
[2mdist/[22m[36massets/swift-D82vCrfD.js                         [39m[1m[2m   86.69 kB[22m[1m[22m[2m Ôöé gzip:  14.73 kB[22m
[2mdist/[22m[36massets/fortran-free-form-BxgE0vQu.js             [39m[1m[2m   88.97 kB[22m[1m[22m[2m Ôöé gzip:  11.27 kB[22m
[2mdist/[22m[36massets/csharp-COcwbKMJ.js                        [39m[1m[2m   89.69 kB[22m[1m[22m[2m Ôöé gzip:  10.69 kB[22m
[2mdist/[22m[36massets/racket-BqYA7rlc.js                        [39m[1m[2m   92.39 kB[22m[1m[22m[2m Ôöé gzip:  15.02 kB[22m
[2mdist/[22m[36massets/less-B1dDrJ26.js                          [39m[1m[2m   97.63 kB[22m[1m[22m[2m Ôöé gzip:  14.70 kB[22m
[2mdist/[22m[36massets/blade-D4QpJJKB.js                         [39m[1m[2m  104.98 kB[22m[1m[22m[2m Ôöé gzip:  28.20 kB[22m
[2mdist/[22m[36massets/objective-c-DXmwc3jG.js                   [39m[1m[2m  105.41 kB[22m[1m[22m[2m Ôöé gzip:  23.33 kB[22m
[2mdist/[22m[36massets/php-Dhbhpdrm.js                           [39m[1m[2m  111.06 kB[22m[1m[22m[2m Ôöé gzip:  28.52 kB[22m
[2mdist/[22m[36massets/sequenceDiagram-DBY2YBRQ-BoA9Tqrv.js      [39m[1m[2m  117.45 kB[22m[1m[22m[2m Ôöé gzip:  31.28 kB[22m
[2mdist/[22m[36massets/swimlanes-5IMT3BWC-B7Leq8xM.js            [39m[1m[2m  120.26 kB[22m[1m[22m[2m Ôöé gzip:  44.00 kB[22m
[2mdist/[22m[36massets/asciidoc-Ve4PFQV2.js                      [39m[1m[2m  131.53 kB[22m[1m[22m[2m Ôöé gzip:   9.34 kB[22m
[2mdist/[22m[36massets/mdx-Cmh6b_Ma.js                           [39m[1m[2m  136.11 kB[22m[1m[22m[2m Ôöé gzip:  23.35 kB[22m
[2mdist/[22m[36massets/architectureDiagram-ZJ3FMSHR-CyGnLR2P.js  [39m[1m[2m  151.58 kB[22m[1m[22m[2m Ôöé gzip:  43.12 kB[22m
[2mdist/[22m[36massets/objective-cpp-CLxacb5B.js                 [39m[1m[2m  171.97 kB[22m[1m[22m[2m Ôöé gzip:  30.62 kB[22m
[2mdist/[22m[36massets/javascript-wDzz0qaB.js                    [39m[1m[2m  174.83 kB[22m[1m[22m[2m Ôöé gzip:  16.51 kB[22m
[2mdist/[22m[36massets/tsx-COt5Ahok.js                           [39m[1m[2m  175.54 kB[22m[1m[22m[2m Ôöé gzip:  16.51 kB[22m
[2mdist/[22m[36massets/jsx-g9-lgVsj.js                           [39m[1m[2m  177.79 kB[22m[1m[22m[2m Ôöé gzip:  16.61 kB[22m
[2mdist/[22m[36massets/typescript-BPQ3VLAy.js                    [39m[1m[2m  181.08 kB[22m[1m[22m[2m Ôöé gzip:  16.04 kB[22m
[2mdist/[22m[36massets/angular-ts-BwZT4LLn.js                    [39m[1m[2m  183.82 kB[22m[1m[22m[2m Ôöé gzip:  16.63 kB[22m
[2mdist/[22m[36massets/vue-vine-CQOfvN7w.js                      [39m[1m[2m  190.05 kB[22m[1m[22m[2m Ôöé gzip:  17.98 kB[22m
[2mdist/[22m[36massets/wolfram-lXgVvXCa.js                       [39m[1m[2m  262.39 kB[22m[1m[22m[2m Ôöé gzip:  77.14 kB[22m
[2mdist/[22m[36massets/cytoscape.esm-BCxqYfIc.js                 [39m[1m[2m  443.69 kB[22m[1m[22m[2m Ôöé gzip: 142.35 kB[22m
[2mdist/[22m[36massets/wasm-CG6Dc4jp.js                          [39m[1m[33m  622.34 kB[39m[22m[2m Ôöé gzip: 230.29 kB[22m
[2mdist/[22m[36massets/cpp-CofmeUqb.js                           [39m[1m[33m  626.08 kB[39m[22m[2m Ôöé gzip:  44.82 kB[22m
[2mdist/[22m[36massets/cynefin-VYW2F7L2-D1misIGn.js              [39m[1m[33m  690.63 kB[39m[22m[2m Ôöé gzip: 155.09 kB[22m
[2mdist/[22m[36massets/index-BE_j3tcp.js                         [39m[1m[33m  707.85 kB[39m[22m[2m Ôöé gzip: 210.52 kB[22m
[2mdist/[22m[36massets/emacs-lisp-C9XAeP06.js                    [39m[1m[33m  779.85 kB[39m[22m[2m Ôöé gzip: 196.03 kB[22m
[2mdist/[22m[36massets/mermaid-GHXKKRXX-DjSZBT3I.js              [39m[1m[33m1,698.85 kB[39m[22m[2m Ôöé gzip: 477.89 kB[22m

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
[32mÔ£ô built in 19.11s[39m
