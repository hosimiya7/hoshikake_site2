// function getId(dom) {
//     const scrollTop = dom.scrollTop()
//     if (scrollTop > 100 && scrollTop < 600) {
//         return 'call_sound'
//     }
//     if (scrollTop > 800 && scrollTop < 1200) {
//         return 'sizuku_sound'
//     }
//     return null
// }

$(function () {

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
});


// class Sound {

//     dom

//     constructor(id) {
//         this.dom = document.getElementById(id);
//     }

//     playSound() {
//         if (this.dom) {
//             this.dom.play()
//         }
//     }

//     pauseSound() {
//         this.dom.pause()
//     }
// }

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
            if (windowS > elemO - windowH + (windowH / 2) && windowS < elemO + elemH - (elemH / 2)) {
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
