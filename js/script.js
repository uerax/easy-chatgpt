
(function () {
    var a = { 
        messageToSend: "", 
        messageResponses: "请求失败,请重新发送", 
        init: function () { 
            this.cacheDOM(); 
            this.bindEvents();
            this.render();
        }, 
        cacheDOM: function () { 
            this.$chatHistory = $(".chat-history"); 
            this.$button = $("button"); 
            this.$textarea = $("#message-to-send"); 
            this.$chatHistoryList = this.$chatHistory.find("ul") 
        }, 
        bindEvents: function () { 
            this.$button.on("click", this.addMessage.bind(this)); 
            this.$textarea.on("keyup", this.addMessageEnter.bind(this)) 
        },
        render: function () { 
            this.scrollToBottom(); 
            if (this.messageToSend.trim() !== "") {
                var e = Handlebars.compile($("#message-template").html()); 
                var c = { 
                    messageOutput: this.messageToSend, 
                    time: this.getCurrentTime() 
                }; 
                this.$chatHistoryList.append(e(c)); 
                this.scrollToBottom(); 
                this.$textarea.val(""); 
                var f = Handlebars.compile($("#message-response-template").html()); 
                this.scrollToBottom(); 
                setTimeout(function () { 
                    var d = { 
                        response: this.getRandomItem(this.messageToSend.trim()),
                        time: this.getCurrentTime() 
                    }; 
                    this.$chatHistoryList.append(f(d)); 
                    this.scrollToBottom() 
                }.bind(this), 1500) 

            } 
        }, 
        addMessage: function () { 
            this.messageToSend = this.$textarea.val(); 
            this.render() 
        }, 
        addMessageEnter: function (c) { 
            if (c.keyCode === 13) { 
                this.addMessage() 
            } 
        }, 
        scrollToBottom: function () { 
            this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight) 
        }, 
        getCurrentTime: function () { 
            return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") 
        }, 
        getRandomItem: function (c) {
            let ans = "请求失败,请重新发送"
            // 在此处输入你的openai的apikey
            var apikey = ""
            $.ajax({
                url: "https://api.openai.com/v1/completions",
                data: JSON.stringify({
                    "model": "text-davinci-003",
                    "prompt": c,
                    "temperature": 0,
                    "max_tokens": 2000
                }),
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': "Bearer "+apikey
                },
                async: false,
                success: function(response) {
                    console.log(response.choices[0].text);
                    ans = response.choices[0].text.trim()
                }
            })
            return ans
        }
    }; 
    a.init();
})();