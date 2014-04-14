var foodstring = "吉野家|快餐/米饭,麦当劳|快餐/汉堡,必胜客|快餐/比萨,真功夫|快餐/米饭,苏氏牛肉面|快餐/拉面,禾绿寿司|日式料理/寿司,康师傅|快餐/拉面,味千拉面|日式料理/拉面";
var store = function(d) {
  if(window.localStorage) {
    var m = [];
    for(var i in d) {
      m.push(d[i].name + "|" + d[i].type);
    }
    m = m.join(",");
    window.localStorage.setItem("chisha", m);
  }
};
var get = function() {
  if(window.localStorage) {
    var d = window.localStorage.getItem("chisha");
  }
  if(!d) {
    d = foodstring;
  }
  d = d.split(",");
  for(var i in d) {
    var t = d[i].split("|");
    d[i] = {"name": t[0], "type": t[1]};
  }
  return d;
};
var app = angular.module("c", []);
app.controller("c_ctrl", function($scope) {
  $scope.init = function() {
    $scope.foodlist = get() || foodlist;
    $scope.choose();
  };
  $scope.choose = function() {
    $scope.chosen = $scope.foodlist[Math.floor(Math.random() * ($scope.foodlist.length))].name;
  };
  $scope.add = function() {
    if($scope.name) {
      $scope.foodlist.push({"name": $scope.name, "type": $scope.type || "n/a"});
      $scope.name = $scope.type = "";
      store($scope.foodlist);
    }
  };
  $scope.del = function(k) {
    for(var i in $scope.foodlist) {
      if($scope.foodlist.length > 1 && $scope.foodlist[i].$$hashKey == k.target.id) {
        $scope.foodlist.splice(i, 1);
        store($scope.foodlist);
      }
    }
  };
  $scope.init();
});