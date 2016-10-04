/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// Initializes FriendlyChat.
var ChatJS = function(){
  return {
    init: function(){
      window.setTimeout(function(){
        var messageList = document.getElementById('messages');
        var messageInput = document.getElementById('message');

        $(".message-container").css("opacity", 1);
        $("#message").on("keyup", function(){
          if ($(this).val()) {
            $("#submit").prop('disabled', false);
          } else {
            $("#submit").prop('disabled', true);
          }
        }).on("focus", function(){
          $(".mdl-textfield__label").addClass("is-focused");
          if($("#message").val()=='') $("#submit").prop('disabled', true);
        }).on("blur", function(){
          if($("#message").val()!=''){
            $(".mdl-textfield__label").removeClass("is-focused");
            $(".mdl-textfield__label").addClass("is-upgraded");
          }else{
            $(".mdl-textfield__label").removeClass("is-focused");
          }
        });

        messageList.scrollTop = messageList.scrollHeight;
        messageInput.focus();
      }, 500)
    }
  }
}();
