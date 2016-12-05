# Telegram MTG Bot

This is one-night project developed for fun by [Impronta Advance](http://improntaadv.com) team.

The project aim is to make a Telegram BOT which can easily retrieve [_Magic: The Gathering®_](http://magic.wizards.com) card's prices from [_MagicCardMarket_](https://www.magiccardmarket.eu).


## Commands

#### /price _card_[, _card_]*
Bot return the prices for the cards that match _card_ parameter. It can search multiple cards if comma-separated.  The prices shown are the lowest price for card (condition EX+) and the trend price.

Example:
```
# User:
/price snapcaster, izzet staticaster

# BOT:
Snapcaster Mage - INN - 35.50 | 39.72 €
Snapcaster Mage - DCI - 69.99 | 78.50 €

Izzet Staticaster - RTR - 0.02 | 0.20 €
```

#### /last
Bot return the last 10 _card_ searched.


## Inline query
User can interact with bot from any chat via inline query. Just type `@mkmpricebot` followed by a card name, to retrieve a list of direct links to [_MagicCardMarket_](https://www.magiccardmarket.eu) 's card page.  


## The architecture
The system will be based on multiple services orchestrating by [Docker](https://www.docker.com/).

#### Telegram service
It should provide integration with Telegram, receving chat's commands and translating them into internal calls.

#### MKM api service
It should provide REST API to find cards prices into MKM.

#### Web service (AKA _Cool! But I don't use Telegram_)
It should provide web interface where anybody can query cards' prices from desktop, mobile and tablets. _(Sorry MKM, you're mobile version is really slow!)_


# MIT License

Copyright © 2016 Matteo Manchi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

The cards' names and images are Copyright © Wizards of the Coast - All Rights Reserved.
This project, software and website are not affiliated in any way nor with Wizards of the Coast nor Magic Card Market.
