(function() {

    var app = {
        // Длительность анимации в мс и количество монет на старте игры
        animateTablo: 3000,
        money: 20,
        matrix: [
            [],
            [],
            []
        ],

        initialize: function() {
            this.setUpListeners();
        },

        // Установка слушателей событий
        setUpListeners: function() {
            $('.spinButton').on('click', $.proxy(this.randomTablo, this));
        },

        // Удаление слушателей событий
        disableListeners: function() {
            $('.spinButton').addClass('disabled').off('click');
        },

        // Заполнение табло случайными картинками, проигрывание анимации и запуск игры
        randomTablo: function() {
            // удаляем слушатель событий для кнопки спина
            this.disableListeners();
            var dataTablo = [
                [],
                [],
                []
            ];

            this.matrix = [
                [this.randomMatrix(), this.randomMatrix(), this.randomMatrix()],
                [this.randomMatrix(), this.randomMatrix(), this.randomMatrix()],
                [this.randomMatrix(), this.randomMatrix(), this.randomMatrix()]
            ];

            // добавляем в каждое табло span для анимации
            $('.tablo1').html('<span class="tablo1img"></span>');
            $('.tablo2').html('<span class="tablo2img"></span>');
            $('.tablo3').html('<span class="tablo3img"></span>');

            // заполняем каждый span случайными картинками
            for (var i = 0; i < 45; i++) {
                dataTablo[0].push(this.randomMatrix());
                dataTablo[1].push(this.randomMatrix());
                dataTablo[2].push(this.randomMatrix());
            }

            for (var i = 0; i <= 2; i++) {
                    dataTablo[i].push(this.matrix[i][0],this.matrix[i][1],this.matrix[i][2]);
            }

            for (var i = 0; i < dataTablo[0].length; i++) {
                $('.tablo1img').html($('.tablo1img').html()+'<img src="images/SYM'+dataTablo[0][i]+'.png">');
                $('.tablo2img').html($('.tablo2img').html()+'<img src="images/SYM'+dataTablo[1][i]+'.png">');
                $('.tablo3img').html($('.tablo3img').html()+'<img src="images/SYM'+dataTablo[2][i]+'.png">');
            }



            // проигрываем анимацию вращения табло
            $(".tablo1img").stop().animate({
                marginTop: '-7200'
            }, this.animateTablo);
            $(".tablo2img").stop().animate({
                marginTop: '-7200'
            }, this.animateTablo);
            $(".tablo3img").stop().animate({
                marginTop: '-7200'
            }, this.animateTablo);

            // после выполнения анимации запускаем метод старта игры
            setTimeout($.proxy(this.startGame, this), this.animateTablo);
        },

        // генерируем и возвращаем случайное число для анимации
        randPosition: function(min, max) {
            var num = max - min + 1;
            return Math.floor(Math.random() * num) + min;
        },

        // генерируем и возвращаем случайное число от 0 до 5
        randomMatrix: function() {
            return Math.round(Math.random() * 5);
        },

        // главная логика игры
        startGame: function() {
            // отнимаем монетку за попытку игры и устанавливаем слушатель для кнопки
            this.money--;
            this.setUpListeners();

            // в табло заносим картинки для отображения сгенерированой матрицы и показываем что на кнопку можно нажать
            $('.spinButton').removeClass('disabled');

            // img - заносим все найденые картинки нашего табло
            var img = jQuery('.container').find('img');

            // создаем промежуточные переменные матрицы
            // [a, b, c]
            // [d, e, f]
            // [g, h, r]
            var a = this.matrix[0][0],
                b = this.matrix[1][0],
                c = this.matrix[2][0],
                d = this.matrix[0][1],
                e = this.matrix[1][1],
                f = this.matrix[2][1],
                g = this.matrix[0][2],
                h = this.matrix[1][2],
                r = this.matrix[2][2];

            // начало проверки на совпадение выиграшной линии и запуск анимации линии
            if (a == b && b == c && a == c) {
                this.congratulation();
                for (var s = 0; s < 10; s++) {
                    this.animation(img[45], img[93], img[141]);
                }
            }

            if (d == e && e == f && d == f) {
                this.congratulation();
                for (var s = 0; s < 10; s++) {
                    this.animation(img[46], img[94], img[142]);
                }
            }

            if (g == h && h == r && g == r) {
                this.congratulation();
                for (var s = 0; s < 10; s++) {
                    this.animation(img[47], img[95], img[143]);
                }
            }

            if (a == e && e == r && a == r) {
                this.congratulation();
                for (var s = 0; s < 10; s++) {
                    this.animation(img[45], img[94], img[143]);
                }
            }

            if (g == e && e == c && g == c) {
                this.congratulation();
                for (var s = 0; s < 10; s++) {
                    this.animation(img[47], img[94], img[141]);
                }
            }
            // конец проверки на совпадение

            // если монет уже нету, то удаляем слушатели и показываем что игра окончена
            if (!this.money) {
                this.disableListeners();
                $('.gameOver').css('display', 'block');
            }

            // показываем текущее значение монет
            $('.money').text('Монеты: ' + this.money);
        },

        // добавляем 3 монеты за выигрыш
        congratulation: function() {
            this.money += 3;
        },

        // анимация выиграшной линии
        animation: function(img1, img2, img3) {
            $(img1).animate({
                opacity: 0.25
            }, 500);
            $(img1).animate({
                opacity: 1
            }, 500);

            $(img2).animate({
                opacity: 0.25
            }, 500);
            $(img2).animate({
                opacity: 1
            }, 500);

            $(img3).animate({
                opacity: 0.25
            }, 500);
            $(img3).animate({
                opacity: 1
            }, 500);
        }

    };

    // инициализация нашей игры
    app.initialize();

}());
