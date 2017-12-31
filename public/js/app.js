const app = angular.module('TravelsApp', ['ngRoute']);


app.controller('MainController', ['$http', function ($http) {


    // ========================================
    // LOGIN LOGIC
    // ========================================

    this.error = null;
    this.user = false;
    this.location = {};

    // auth functions
    this.registerUser = () => {
        console.log('working');
        $http({ url: '/users', method: 'post', data: this.newUserForm })
            .then(response => {
                console.log('We have success!');
                this.user = response.data;
                this.closeRegisterModal();
            }, ex => {
                console.log('user already exists');
                console.log(ex.data.err);
                this.error = ex.statusText;
            })
            .catch(err => this.error = 'Server working?');

    };

    this.loginUser = () => {
        $http({ url: '/sessions/login', method: 'post', data: this.loginForm })
            .then((response) => {

                console.log('Log in successful!');
                console.log(response.data);
                this.user = response.data.user;
                console.log(this.user);
                this.closeLoginModal();
                // this.location = response.data;
            }, ex => {
                console.log(ex.data.err);
                this.error = ex.statusText;
            })
            .catch(err => this.error = 'Server broke?');
    };

    this.logout = () => {
        $http({ url: '/sessions/logout', method: 'delete' })
            .then((response) => {
                console.log(response.data);
                this.user = null;
            });
    };



    //-----CRUD ROUTES below -------


    this.travel = '';
    this.travels = [];

    this.createForm = {};

    this.createTravel = () => {
        $http({
            method: 'POST',
            url: '/travels',
            data: this.createForm
        }).then(response => {
            this.travels.push(response.data);
            this.createForm = {};
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }

    this.getTravels = () => {
        $http({
            method: 'GET',
            url: '/travels'
        }).then(response => {
            this.travels = response.data;
            this.travel = this.travels[0];
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }

    //load immediately on page load
    this.getTravels();


    this.deleteTravel = (id) => {
        $http({
            method: 'DELETE',
            url: '/travels/' + id
        }).then(response => {
            const removeByIndex = this.travels.findIndex(travel => travel._id === id)
            this.travels.splice(removeByIndex, 1);
        }
            , error => {
                console.error(error.message);
            }).catch(err => console.error('Catch: ', err));
    }

    /////------------edit below--------

    // Update travel
    this.showEdit = (travel) => {
        this.editModal = true;
        this.currentTravelEdit = angular.copy(travel)
    }

    this.editTravel = () => {
        this.edittedData = this.currentTravelEdit;
        $http({
            method: 'PUT',
            url: '/travels/' + this.currentTravelEdit._id,
            data: this.currentTravelEdit
        }).then((response) => {
            const updateByIndex = this.travels.findIndex(travel => travel._id === this.edittedData._id)
            this.travels[updateByIndex] = this.edittedData;
        }).catch(err => console.error('Catch', err));
        this.editModal = false;
        this.currentTravelEdit = {};
    };

    this.dontUpdate = () => {
        this.editModal = false;
        this.currentTravelEdit = {};
    }
    /////-end of editting-----------------

    /////--choose travel info-------------------
    this.chooseOneTravel = (travel) => {
        this.travel = travel;
        this.editData = travel;
    }

    /////-Add travel---
    this.addTravel = (travel) => {

        $http({
            method: 'PUT',
            url: '/travels/' + travel._id,
            data: { likes: travel.likes }
        }).then(response => {
            console.log(response.data.likes);
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }

    // fuction to close nav after clicking login or sign up
    this.closeNav = () => {
      $('.navbar-toggle').class('');
    }

    //-Modal---open/close------------------
    this.showLoginModal = () => {
        console.log('opening model');
        this.modalOpenLogin = true;

    }

    this.closeLoginModal = () => {
        console.log('closing model');
        this.modalOpenLogin = false;

    }
    this.showRegisterModal = () => {
        console.log('opening register model');
        this.modalOpenRegister = true;
    }

    this.closeRegisterModal = () => {
        console.log('closing register model');
        this.modalOpenRegister = false;

    }
    //--side nav ------------------
    this.openNav = () => {
        document.getElementById("mySidenav").style.width = "350px";
    }

    this.closeNav = () => {
        document.getElementById("newbar").style.height = "0";
    }
    //--end--side nav----------------


    //-------------------------------
    // Automatic Slideshow - change image every 4 seconds
    var myIndex = 0;


    this.carousel = () => {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) { myIndex = 1 }
        x[myIndex - 1].style.display = "block";
        setTimeout(this.carousel, 4000);
    }
    this.carousel();
    // Used to toggle the menu on small screens when clicking on the menu button
    this.myFunction = () => {
        var x = document.getElementById("navDemo");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    var modal = document.getElementById('ticketModal');
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    // -- page routes ------------------


    app.controller('ResturantsController', function () {
        this.resturants = 'Tartine';
    });

    app.controller('GalleriesController', function () {
        // this.phone = '555-1212';
    });

    app.controller('HotelsController', function () {
        // this.phone = '555-1212';
    });

    app.controller('ItinerariesController', function () {
        // this.phone = '555-1212';
    });

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        // Enables Push State
        $locationProvider.html5Mode({ enabled: true });

        // ROUTES
        $routeProvider.when('/itineraries', {
            templateUrl: 'itineraries.html',
            controller: 'ItinerariesController',
            controllerAs: 'ctrl'
        });

        $routeProvider.when('/restuarants', {
            templateUrl: 'restuarants.html',
            controller: 'ResturantsController',
            controllerAs: 'ctrl'
        });

        $routeProvider.when('/hotels', {
            templateUrl: 'hotels.html',
            controller: 'HotelsController',
            controllerAs: 'ctrl'
        });

        $routeProvider.when('/galleries', {
            templateUrl: 'galleries.html',
            controller: 'GalleriesController',
            controllerAs: 'ctrl'
        });
        $routeProvider.otherwise({
            // if browser url doesn't match any of the above...
            // here you can do something like above if you'd like with a template and a controller
            redirectTo: '/' // or you can redirect to another url.
            // redirection can happen in any 'when' action; I just happened to do it here.
            // I could have put it in one of the above sections too
        });

    }]);

    //-----google map ---------------------


    //To use this code on your website, get a free key from Google.
    // Read more at: https://www.w3schools.com/graphics/google_maps_basic.asp

    // function myMap() {
    //     myCenter = new google.maps.LatLng(41.878114, -87.629798);
    //     var mapOptions = {
    //         center: myCenter,
    //         zoom: 12, scrollwheel: false, draggable: false,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

    //     var marker = new google.maps.Marker({
    //         position: myCenter,
    //     });
    //     marker.setMap(map);
    // }




// Travel Info - Amadeus travel request ----------------

    // this.destination = {};
    // this.departureDate = [];
    // this.tripDuration = [];
    // this.test = 'works';
    $http({
        url:'/hotelsParis',
        method: 'GET'
    }).then(response => {
        // this.travelauth = response.data.travelauth
        this.hotelsParis = response.data.hotelsParis
    })
        .catch(err => console.log(err));


            this.hotelsParisfunction = () => {
                console.log('getting hotels Paris array!')
                $http({
                    url: this.hotelsParis,
                    method: 'GET'
                }).then(response => {
                    this.travelInfosParis = response.data.results
                    console.log(this.travelInfosParis)
                    // this.hotelsParisParsed = JSON.parse(travelInfos)
                    // console.log(this.hotelsParisParsed)
                })
                    .catch(err => console.log(err));
            }



    $http({
        url: '/hotelsLondon',
        method: 'GET'
    }).then(response => {
        // this.travelauth = response.data.travelauth
        this.hotelsLondon = response.data.hotelsLondon
    })
        .catch(err => console.log(err));


    this.hotelsLondonfunction = () => {
        console.log('getting hotels London array!')
        $http({
            url: this.hotelsLondon,
            method: 'GET'
        }).then(response => {
            this.travelInfosLondon = response.data.results
            console.log(this.travelInfosLondon)
            // this.hotelsLondonParsed = JSON.parse(travelInfos)
            // console.log(this.hotelsLondonParsed)
        })
            .catch(err => console.log(err));
    }



    $http({
        url: '/hotelsJamaica',
        method: 'GET'
    }).then(response => {
        // this.travelauth = response.data.travelauth
        this.hotelsJamaica = response.data.hotelsJamaica
    })
        .catch(err => console.log(err));


    this.hotelsJamaicafunction = () => {
        console.log('getting hotels Jamaica array!')
        $http({
            url: this.hotelsJamaica,
            method: 'GET'
        }).then(response => {
            this.travelInfosJamaica = response.data.results
            console.log(this.travelInfosJamaica)
            // this.hotelsParisParsed = JSON.parse(travelInfos)
            // console.log(this.hotelsParisParsed)
        })
            .catch(err => console.log(err));
    }

            //end travel ---


    AOS.init({
        // easing: 'ease-out-back',
        duration: 3000
    })

}]);

