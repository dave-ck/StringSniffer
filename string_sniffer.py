import os
import re

wordlists = {}


def load_sets():
    for file_path in os.listdir("./wordlists"):
        file = open("./wordlists/" + file_path, "r", encoding="utf-8")
        file_text = file.read().strip()
        word_list = map(str.strip, file_text.strip().split("\n"))
        word_list = list(set(word_list))  # put through set to eliminate any duplicates
        wordlists.update({file_path[:-4]: word_list})


def match_string(input_string):
    global wordlists
    output_dict = {}
    for wordlist_name in wordlists:
        for word in wordlists[wordlist_name]:
            for hit in re.finditer(word.lower(), input_string.lower()):
                if word.upper() == word and word != input_string[hit.start():hit.end()]:
                    continue  # if word in glossary is an acronym AND does not appear capitalized in text, ignore it
                hit_end = hit.end()
                if hit_end not in output_dict:
                    output_dict.update({hit_end: []})
                output_dict[hit_end].append({"word": word, "source": wordlist_name})
    return output_dict


load_sets()
