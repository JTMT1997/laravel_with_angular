app.controller('booksController', function ($scope, $http, API_URL) {
    //retrieve books listing from 

    $http({
        method: 'GET',
        url: API_URL + "books"
    }).then(function (response) {
        $scope.books = response.data.books;
        console.log(response);
    }, function (error) {
        console.log(error);
        alert('This is embarassing. An error has occurred. Please check the log for details');
    });

    //show modal form
    $scope.toggle = function (modalstate, id) {
        $scope.modalstate = modalstate;
        $scope.book = null;

        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add New Book";
                break;
            case 'edit':
                $scope.form_title = "Book Detail";
                $scope.id = id;
                $http.get(API_URL + 'books/' + id)
                    .then(function (response) {
                        console.log(response);
                        $scope.book = response.data.book;
                    });
                break;
            default:
                break;
        }
        
        console.log(id);
        $('#myModal').modal('show');
    }

    //save new record / update existing record
    $scope.save = function (modalstate, id) {
        var url = API_URL + "books";
        var method = "POST";

        //append book id to the URL if the form is in edit mode
        if (modalstate === 'edit') {
            url += "/" + id;

            method = "PUT";
        }

        $http({
            method: method,
            url: url,
            data: $.param($scope.book),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            console.log(response);
            location.reload();
        }), (function (error) {
            console.log(error);
            alert('This is embarassing. An error has occurred. Please check the log for details');
        });
    }

    //delete record
    $scope.confirmDelete = function (id) {
        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {

            $http({
                method: 'DELETE',
                url: API_URL + 'books/' + id
            }).then(function (response) {
                console.log(response);
                location.reload();
            }, function (error) {
                console.log(error);
                alert('Unable to delete');
            });
        } else {
            return false;
        }
    }
});