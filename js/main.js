const deckstring = require("./encoding.js");

$("#cardsearch").on("input", function() {
    $("#results").empty();

    var results = 0;
    const aspects = deckAspects();

    for (let card of deckstring.cards) {
        if (results >= 30) {
            break;
        } else if (card["name"].toLowerCase().includes($(this).val().toLowerCase()) && (aspects.length < 2 | aspects.includes(card["aspect"][0]))) {
            $(`<tr name="` + card["id"] + `">
                <td><img class="mr-2" src="images/` + card["aspect"][0] + `.png" width="20" height="20"/><a href="#">` + card["name"] + `<img src="images/` + card["id"] + `.png"/></a></td>
                <td>` + card["cost"] + `</td>
                <td>
                    <button type="button" class="btn btn-sm btn-light">
                        <span class="fa fa-plus" aria-hidden="true"></span>
                    </button>
                </td>
               </tr>`).hide().appendTo($("#results")).show("normal");

            results++;
        }
    }

    $("#results").find("button").click(function () {
        addCard($(this).parent().parent().attr("name"));
    });
});

function addCard(card_id) {
    const cardCount = countCards();

    if (cardCount < 40) {
        for (let card of deckstring.cards) {
            if (card["id"] == card_id) {
                const aspects = deckAspects();
                if (aspects.length < 2 | aspects.includes(card["aspect"][0])) {
                    var found = false;

                    for (let tr of $("#deck > tr")) {
                        if ($(tr).attr("name") == card_id) {
                            if ($(tr).find("input").val() <= 2) {
                                $(tr).find("input").val(parseInt($(tr).find("input").val()) + 1);
                            }
                            found = true;
                        }
                    }

                    if (!found) {
                        $(`<tr name="` + card["id"] + `">
                            <td><img class="mr-2" src="images/` + card["aspect"][0] + `.png" width="20" height="20"><a href="#">` + card["name"] + `<img src="images/` + card["id"] + `.png"></a></td>
                            <td>` + card["cost"] + `</td>
                            <td><input type="number" min="0" max="3" placeholder="#" step="1" value="1"/></td>
                            <td>
                                <button type="button" class="btn btn-sm btn-light">
                                    <span class="fa fa-minus" aria-hidden="true"></span>
                                </button>
                            </td>
                           </tr>`).hide().appendTo($("#deck")).show("normal");

                        $("#deck > tr > td > input").change(function() {
                            if ($(this).val() == 0) {
                                $(this).parent().parent().remove();
                            }
                            calculateDeckstring();
                        });

                        $("input[type=number]").change(function() {
                            if ($(this).val() > 3) {
                                $(this).val(3);
                            }

                            if (countCards() > 40) {
                                $(this).val(parseInt($(this).val()) - 1);
                                alert("Only 40 cards per deck");
                                throw new RangeError("Only 40 cards per deck");
                            }
                        });
                    }

                    calculateDeckstring();

                    break;

                } else {
                    // non-obtrusive alert in future
                    alert("Only two aspects per deck");
                    throw new RangeError("Only two aspects per deck");
                }
            }
        }

        $("#deck").find("button").off("click").click(function () {
            $(this).parent().parent().find("input").val(parseInt($(this).parent().parent().find("input").val()) - 1);
            if ($(this).parent().parent().find("input").val() == 0){
                $(this).parent().parent().remove();
            };

            calculateDeckstring();
        });

    } else {
        // non-obtrusive alert in future
        alert("Only 40 cards per deck");
        throw new RangeError("Only 40 cards per deck");
    }
}

function countCards() {
    var cards = 0;

    for (let tr of $("#deck > tr")) {
        cards += parseInt($(tr).find("input").val());
    }

    return cards;
}

function deckAspects() {
    const aspects = [];

    for (let tr of $("#deck > tr")) {
        var aspect = /[ACDNT]/.exec($(tr).find("img").attr("src"))[0];
        if (!aspects.includes(aspect)) {
            aspects.push(aspect);
        }
    }

    return aspects;
}

function calculateDeckstring() {
    $("#deckstring").val(deckstring.encode_deck($("#deck > tr").toArray().map(tr => [parseInt($(tr).attr("name")), parseInt($(tr).find("input").val())]), deckAspects().map(aspect => 'ACDNT'.indexOf(aspect))));
}

function fromDeckString(deckstring_) {
    $("#deck").empty();

    const deck = deckstring.decode_deck(deckstring_);

    for (let card of deck[2]) {
        try {
            for (let x = 0; x < card[1]; x++) {
                addCard(card[0]);
            }
        } catch (e) {
            $("#deck").empty();
            calculateDeckstring();

            alert(e.message);
            throw e;
        }
    };
}

$("#deckstring").on("input", function() {
    fromDeckString($(this).val())
});

if (new URLSearchParams(window.location.search).has("deckstring")) {
    fromDeckString(new URLSearchParams(window.location.search).get("deckstring"));
}

calculateDeckstring();
$("#cardsearch").trigger("input");
