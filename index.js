
$(function () {
    alert('右上の音量ボタンをオンにするとこのサイトをよりお楽しみいただけます');

    $('#Audio-Control button').click(function () {
        $('#Audio-Control button').toggleClass('active');
    });

    $('#off').click(function () {
        const sounds = new Sounds()
        sounds.enableMute();
    });

    $('#on').click(function () {
        const sounds = new Sounds()
        sounds.disableMute();
    });

    $(window).scroll(function () {
        const sounds = new Sounds()
        if (!sounds.isMuted()) {
            sounds.playSounds('mission', 'call_sound')
            sounds.playSounds('command', 'voice_sound')
            sounds.playSounds('ticket', 'sizuku_sound')
        }
    });

    $('input').change(function() {

        const message = new Message()
        console.log(message.inputText)
        message.isMessage()

    });
});


class Sounds {

    /**
     *
     * @param {string} visibleAreaClass 音楽を流す範囲のクラス
     * @param {string} audioId 音楽のID
     */
    playSounds(visibleAreaClass, audioId) {
        // 変化させる要素
        const elem = $('.' + visibleAreaClass);
        // ページトップからの要素の高さ
        const elemO = elem.offset().top;
        // 変化させる要素の高さ
        const elemH = elem.height();
        // ウィンドウの高さ
        const windowH = $(window).height();
        // スクロールした値
        const windowS = $(window).scrollTop();

        // 要素が半分見えたら表示して、要素がウィンドウから半分消えたら非表示にする
        if (!this.isMuted()) {
            if (windowS > elemO - windowH + (windowH / 4) && windowS < elemO + elemH - (elemH / 2)) {
                document.getElementById(audioId).play()
            } else {
                document.getElementById(audioId).pause()
            }

        }
    }

    enableMute() {
        document.querySelectorAll('audio').forEach(audio => audio.muted = true)
    }

    disableMute() {
        document.querySelectorAll('audio').forEach(audio => audio.muted = false)
    }

    isMuted() {
        return document.querySelector('button.active').id === 'off'
    }

}

class Message {

    inputText = $("#message").val()

    isMessage() {

        if (this.inputText === '37564' || this.inputText === 'みなごろし' || this.inputText === '皆殺し') {
            $('#change_message').text('見つけてしまったのね。残念。せっかく仲良くなれると思ったのに…。')
            $('#change_message').addClass('change-message')
            $('.hidden-content').addClass('hidden')

        }
        else {
            $('#change_message').text('不正解。残念。諦めて一緒にここで過ごしましょう…。')
            $('#change_message').addClass('change-message')
            $('.hidden-content').addClass('hidden')
            if(this.inputText === ""){
                $('#change_message').text('メッセージを私に教えて')
                $('#change_message').removeClass('change-message')
                $('.hidden-content').removeClass('hidden')
            }

        }
    }

}
