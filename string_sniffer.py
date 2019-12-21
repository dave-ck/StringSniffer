import os
import re

wordlists = {}


def load_sets():
    for file_path in os.listdir("./wordlists"):
        file = open("./wordlists/" + file_path, "r", encoding="utf-8")
        wordlists.update({file_path[:-4]: file.read().split("\n")})


def match_string(input_string):
    global wordlists
    output_dict = {}
    for wordlist_name in wordlists:
        for word in wordlists[wordlist_name]:
            if word in input_string:
                for hit in re.finditer(word, input_string):
                    hit_end = hit.end()
                    if hit_end not in output_dict:
                        output_dict.update({hit_end:[]})
                    output_dict[hit_end].append({"word":word, "source":wordlist_name})
    return output_dict
load_sets()
print(wordlists)
print(match_string("bonjour poutine"))