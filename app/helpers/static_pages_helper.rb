# encoding: utf-8

module StaticPagesHelper
private

  def codex
  {"a"=>{1=>["ᗋ","ᗅ"],2=>["ᗗ"],3=>["ᗨ"],4=>["ᗚ"],5=>["ឌ","ឌ","ឳ","ឱ"],6=>[""]},
   "b"=>{1=>["ᗸ"],2=>["ᙗ","ᙞ"],3=>["ᘀ"],4=>["ᗲ","ᘊ"],5=>["ᗴ"],6=>["ᗶ"]},
   "c"=>{1=>["ᒼ"],2=>["ᓚ"],3=>["ᓛ"],4=>[""],5=>[""],6=>[""]},
   "d"=>{1=>["ᕍ"],2=>["ᙃ","ᒄ"],3=>["ᖙ"],4=>["ᙃ"],5=>["ᘲ"],6=>[""]},
   "e"=>{1=>["ԑ"],2=>["દ"],3=>[""],4=>["ྗ"],5=>[""],6=>[""]},
   "f"=>{1=>["ᖴ"],2=>["ᖷ"],3=>["ᖶ"],4=>["ᖵ"],5=>[""],6=>[""]},
   "g"=>{1=>[""],2=>[""],3=>[""],4=>[""],5=>["ទ"],6=>[""]},
   "h"=>{1=>["ⶋ"],2=>["ⶶ"],3=>["ⶲ"],4=>["ꬕ"],5=>["ⶵ"],6=>[""]},
   "i"=>{1=>["յ","ເ","༐"],2=>[""],3=>["༆"],4=>["༐"],5=>["༐"],6=>[""]},
   "j"=>{1=>["ᒙ","ᒏ"],2=>["ᒚ"],3=>["ᒠ"],4=>["ᒡ"],5=>["ᒒ","ᖔ"],6=>["ᒖ","ᙵ"]},
   "k"=>{1=>["Ꮶ"],2=>[""],3=>[""],4=>[""],5=>[""],6=>[""]},
   "l"=>{1=>["ᒪ"],2=>["ᒻ"],3=>["ᒹ"],4=>["ᒣ"],5=>[""],6=>[""]},
   "m"=>{1=>["ⶸ"],2=>["ⶏ"],3=>["ᙢ"],4=>["៚","ᄽ"],5=>["ឤ"],6=>["ៅ","៘","ꬥ"]},
   "n"=>{1=>["ⷋ"],2=>["ⷉ"],3=>["ក"],4=>["ⶡ"],5=>["ⷕ"],6=>[""]},
   "o"=>{1=>["៰"],2=>["៙"],3=>["្"],4=>["࿔"],5=>["ፀ"],6=>[""]},
   "p"=>{1=>["ᖘ"],2=>[""],3=>[""],4=>["ᖗ"],5=>["༲"],6=>["࿂"]},
   "q"=>{1=>["ᒅ"],2=>["ᑵ"],3=>[""],4=>[""],5=>[""],6=>[""]},
   "r"=>{1=>["ᒔ"],2=>["ᒖ"],3=>["ᖆ"],4=>["ᖇ"],5=>["ᖈ"],6=>["ᖉ"]},
   "s"=>{1=>["ៜ"],2=>[""],3=>[""],4=>[""],5=>[""],6=>[""]},
   "t"=>{1=>["ፖ"],2=>["ⶒ"],3=>["ፐ","༒"],4=>["ፘ"],5=>["፹"],6=>["ፚ"]},
   "u"=>{1=>[""],2=>["บ"],3=>[""],4=>[""],5=>[""],6=>[""]},
   "v"=>{1=>[""],2=>["ሁ"],3=>["Ꮙ"],4=>[""],5=>[""],6=>[""]},
   "w"=>{1=>["ᙡ"],2=>["ឃ"],3=>["ᐜ"],4=>["ฝ"],5=>[""],6=>[""]},
   "x"=>{1=>["᙭"],2=>["᙮"],3=>["Ꮬ"],4=>[""],5=>[""],6=>[""]},
   "y"=>{1=>[""],2=>["ᗃ"],3=>["ᓷ"],4=>[""],5=>[""],6=>[""]},
   "z"=>{1=>["ᙆ"],2=>["ᙇ"],3=>[""],4=>[""],5=>[""],6=>[""]}}
  end

  def rand_from_level(char, level)
    code = codex
    choices = code[char][level]
    a = code[char][level].length > 1 ? choices[rand(choices.length)] : choices[0]

    a
  end

  def unifi(char, level)
    level = level
    code = codex
    p char
    p code["p"]
    options = code[char][level]
    p options[0]
    until (options[0] != "")
      level += 1
      options = code[char][level]
      if level > 6
        level = 1
        options = code[char][level]
      end
    p options[0]
    p level
    end

    rand_from_level(char, level)
  end

  def obfusc(word, level)
    new_word = []
    letters = word.split(//)
    letters.each do |char|
      new_word << unifi(char, level)
    end
    new_word.join()
  end
end
