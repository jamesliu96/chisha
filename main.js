var foodstring = "吉野家|快餐/米饭,麦当劳|快餐/汉堡,KFC|Hamberger,必胜客|快餐/比萨,真功夫|快餐/米饭,李先生|快餐/拉面,禾绿寿司|日式料理/寿司,康师傅|快餐/拉面,味千拉面|Ramen";
var dict_cn = {
  "lang": "cn",
  "title": "吃啥 - 选择性综合症患者必备",
  "version": "测试版",
  "choosa": "吃啥",
  "change": "English",
  "s1": "今儿咱还是吃",
  "s2": "吧",
  "list": "可选列表",
  "name": "名称",
  "type": "类型",
  "oper": "操作",
  "add": "添加",
  "del": "删除",
  "total": "总数"
};
var dict_en = {
  "lang": "en",
  "title": "Choosa - Decide for you",
  "version": "Beta",
  "choosa": "CHOOSA",
  "change": "中文",
  "s1": "Let's have",
  "s2": "today",
  "list": "Available",
  "name": "Name",
  "type": "Type",
  "oper": "Modify",
  "add": "Add",
  "del": "Delete",
  "total": "Total"
};
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
  $scope.dict = dict_cn;
  $scope.init = function() {
    $scope.foodlist = get() || foodlist;
    if(window.localStorage) {
      var lang = window.localStorage.getItem("chisha_lang");
      if(lang) {
        if(lang == "en") {
          $scope.dict = dict_en;
        }
      }
    }
    $scope.choosa();
  };
  $scope.change = function() {
    if($scope.dict.lang == "cn") {
      $scope.dict = dict_en;
      window.localStorage.setItem("chisha_lang", "en");
    } else {
      $scope.dict = dict_cn;
      window.localStorage.setItem("chisha_lang", "cn");
    }
  };
  $scope.choosa = function() {
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