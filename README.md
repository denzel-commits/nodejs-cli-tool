# What is "nodejs-caesar-cipher"?

Nodejs-caesar-cipher is a command line tool that encode and decode a text by Caesar cipher.

It can be used to encode/decode letters of latin aplhabet from file or console. All othe characters including letters from other languages, numbers, punctauation marks, etc. remain unchanged.

---

# Install

To run the caesar cipher tool from the command line, you'll need to download and install it globally first.

1. Download it from repository
2. Run the command line and go to the application folder
3. You can install it now with the following command: 

$ npm install -g .

This adds the caesar-cipher command to your system path, allowing it to be run from any directory.

---

# Run

You should now be able to run caesar-cipher with the following command and additional options:

$ caesar-cipher [options]

---

# Help

To see a general help menu and available commands for Caesar cipher CLI, run:

$ caesar-cipher --help

---

# Options

CLI tool accepts 4 options, short alias and full name:

* -a, --action: an action encode/decode
* -s, --shift: a shift
* -i, --input: an input file
* -o, --output: an output file

The "action" is mandatory option, it can take the values of "encode" and "decode" and indicates what needs to be done with the incoming text: encrypt or decrypt.

The "shift" is mandatory option, option must be an integer value, it denotes a shift of letters for encryption or decryption.

The "input" option is optional, file path. If specified text from file be used as source text for encryption or decryption. If not specified console input will be used as source text.

The "output" option is optional, file path. If specified will be used as destination for encrypted or decrypted text. If not specified console will be used as destination for resulting text.

---

# Usage examples

$ caesar-cipher -a encode -s 7
$ caesar-cipher -a encode -s 7 -i ./demo/input.txt -o ./demo/output.txt
$ caesar-cipher -a encode -s 7 -i ./demo/input.txt
$ caesar-cipher -a encode -s 7 -o ./demo/output.txt'

