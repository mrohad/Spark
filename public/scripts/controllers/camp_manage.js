app.controller("manageCampsController", function ($scope, $http, $filter) {
    $http.get('/camps_all').then(function (res) {
        $scope.camps = res.data.camps;
        setTimeout(() => {
            innerHeightChange()
        }, 500)
    });

    $scope.removeCamp = (camp_id) => {
        var agree_remove = confirm('Remove camp\n\n\nThis action will remove camp #' + camp_id + '.\n\n\n---\n Are you sure?');
        if (agree_remove) {
            // NOT WORKING SOMEHOW
            // $http.post(`/camps/${camp_id}/remove`, (res) => {
            //     console.log(res);
            //     window.location.reload();
            // });
            $.post('/camps/' + camp_id + '/remove', (res) => {
                window.location.reload();
            })
        }
    }

    $scope.changeOrderBy = function (orderByValue) {
        $scope.orderCamps = orderByValue;
    }
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

app.controller("membersController", ($scope, $http) => {
    $scope.foundUserByEmail='';
    $http.get('/camps_all').then((res) => {
        console.log(res.data);
        $scope.camps = res.data.camps;
    });
    $scope.changed = function(){
        if(validateEmail($scope.searchEmail)) {
            $http.get('/userswithcamp/'+$scope.searchEmail).success((user) => {
                $scope.foundUserByEmail = "Camp: "+ user.camp.camp_name_en;
            }).error(function () {
                $scope.foundUserByEmail = 'Email - '+ $scope.searchEmail+ ' does not exist';
            });
        }
    }
    $scope.getMembers = (camp_id) => {
        if (typeof camp_id !== 'undefined') {
            $scope.current_camp_id = camp_id;
            angular_getMembers($http, $scope, camp_id);
            setTimeout(() => {
                innerHeightChange()
            }, 500);
        }
    }
    $scope.updateUser = (user_name, user_id, action_type) => {
        var camp_id = $scope.current_camp_id;
        var lang = 'he';
        var user_rec = {
            camp_id: camp_id,
            user_name: user_name,
            user_id: user_id,
            lang: lang,
        }
        angular_updateUser($http, $scope, action_type, user_rec);
    }

    $scope.changeOrderBy = (orderByValue) => {
        $scope.orderMembers = orderByValue;
    }
});
