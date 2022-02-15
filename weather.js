const API_KEY = "9730934379c4806648360d3cc00d8894";

function onGeoOk(position){

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    $("#selectGeo").change(function(){
        // select로 지역 선택시 작동
        var selectVal = $("#selectGeo option:selected").val(); // 선택한 값 가져 옴
        console.log(selectVal);
        if(selectVal == "현위치"){
            const change_lat = position.coords.latitude;
            const change_lon = position.coords.longitude;

            lat = change_lat
            lon = change_lon
        } else if(selectVal == "서울"){
            const change_lat = 37.583328
            const change_lon = 127

            lat = change_lat
            lon = change_lon
        } else if(selectVal == "강릉"){
            const change_lat = 37.751853
            const change_lon = 128.8760574

            lat = change_lat
            lon = change_lon
        } else if(selectVal == "대전"){
            const change_lat = 36.321655
            const change_lon = 127.378953

            lat = change_lat
            lon = change_lon
        } else if(selectVal == "대구"){
            const change_lat = 35.798838
            const change_lon = 128.583052

            lat = change_lat
            lon = change_lon
        } else if(selectVal == "광주"){
            const change_lat = 35.1757811066707
            const change_lon = 126.870704892426

            lat = change_lat
            lon = change_lon
        } else if(selectVal == "부산"){
            const change_lat = 35.198362
            const change_lon = 129.053922

            lat = change_lat
            lon = change_lon
        } else if(selectVal == "제주"){
            const change_lat = 33.364805
            const change_lon = 126.542671

            lat = change_lat
            lon = change_lon
        } else {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            return lat, lon
        }
        search_weather();
    })


    function search_weather(){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        // fetch함수: 서버에 데이터 요청
        // .then 서버에서 데이터를 가져오는 작업이 완료된 이후 then에 있는 함수 실행
        // response 객체는 fetch를 통해서 요청했을 때 웹서버가 응답한 결과를 담고있는 객체데이터
        fetch(url)
            .then(response => response.json())
            .then(data =>{
                const feels_like = document.getElementById("feel_temp_info") // 체감온도
                const temp_min = document.getElementById("min_temp_info")  // 최저 온도
                const temp_max = document.getElementById("max_temp_info")  // 최고 온도
                const humidity = document.getElementById("humidity_info") // 습도
                const cur_temp = document.getElementById("cur_temp_info") // 현재 온도
                const city_name = document.getElementById("city_info") // 현재 온도


                city_name.innerText = data.name;
                cur_temp.innerText = data.main.temp.toFixed(1)
                feels_like.innerText = data.main.feels_like.toFixed(1)
                temp_min.innerText = data.main.temp_min.toFixed(1)
                temp_max.innerText = data.main.temp_max.toFixed(1)
                humidity.innerText = data.main.humidity

            });
    }


    search_weather();
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?id=1835848&APPID=c085c85ef7adac74dca0cca6afe4cb80&units=metric'
        ,function(data){
            var $type = data.list[0].weather[0].description;


            if($type == "clear sky")
                $type ='img/sunny.jpg';
            else if($type == "Rain")
                $type = 'img/.jpg';
            else
                $icon = "맑음";
}

// 변수 정리
// 1. data.name: 도시 이름
// 2. data.main.temp: 현재 온도
// 3. data.main.feels_like: 체감 온도
// 4. data.main.temp_min: 최저 온도
// 5. data.main.temp_max: 최고 온도
// 6. data.main.humidity: 습도

// 1체감 온도 2최저 3최고 온도 4강수량 5현재 온도 6도시 이름








// getCurrentPosition이 실패했을 때 함수
function onGeoError(){
    alert("위치를 찾을 수 없어 날씨를 제공할 수 없습니다.")
}

// 유저의 위치를 주는 함수
// 브라우저에서 위치 좌표를 줌
// getCurrentPosition은 성공했을 때 함수, 실패했을 때 함수가 필요
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)