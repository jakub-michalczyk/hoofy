<img src="https://github.com/jakub-michalczyk/hoofy/blob/master/public/assets/images/logo_contrast.svg" width="200" height="200" />

**Hoofy** is a specialized classifieds platform dedicated to the world of horses and equestrianism. It allows users to browse, post, and manage ads related to horses, riding equipment, stables, services, and events. The portal connects horse owners, riders, breeders, trainers, and enthusiasts in one place, making it easier to buy, sell, or promote anything connected to the equestrian community.

<img src="https://github.com/jakub-michalczyk/hoofy/blob/master/public/assets/images/homepage_bg.jpg" />

**Hoofy** is a specialized classifieds platform dedicated to the world of horses and equestrianism. It allows users to browse, post, and manage ads related to horses, riding equipment, stables, services, and events. The portal connects horse owners, riders, breeders, trainers, and enthusiasts in one place, making it easier to buy, sell, or promote anything connected to the equestrian community.

  
## Technologies Used

- **Angular 20**: For the front-end framework.
- **Firebase**: For backend services.
- **Tailwind CSS**: For styling.
- **RxJS**: For reactive programming and handling asynchronous data flows.
- **NgRx Signal Store**: For state management using Angular Signals.

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js**: Recommended version 16 or higher.
- **Angular CLI**: If not installed, you can install it globally using the command:

```bash
npm install -g @angular/cli
```
- **Firebase CLI**: For Firebase hosting and functions deployment.
```bash
npm install -g firebase-tools
```

## Setup
- **Clone repository:**
```bash
git clone https://github.com/jakub-michalczyk/hoofy
```

- **Navigate to the project folder:**
```bash
cd hoofy
```

- **Install the dependencies:**
```bash
npm install
```

- **Firebase init:**
  - Create a Firebase project in the [Firebase Console](https://firebase.google.com/)

  - Add your Firebase configuration details to the environment files in:
_src/environments/environment.ts_


- **Run the development server:**
```bash
ng serve
```

The app will be available at [http://localhost:4200](http://localhost:4200).

## Build for Production ##
To build the project for production, use the following command:
```bash
ng build --prod
```
The build artifacts will be stored in the dist/ directory. You can deploy the project to Firebase Hosting or any other hosting service.

## License ##
This project is licensed under the MIT License - see the LICENSE file for details.

<img src="https://github.com/jakub-michalczyk/hoofy/blob/master/public/assets/images/hoofy_share.png" />
