import sqlite3
#conn = sqlite3.connect('cards.db')
#c = conn.cursor()
from flask import Flask, render_template, jsonify, flash, redirect, url_for, request
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SECRET_KEY'] = '1145'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/Josh Strunk/Desktop/Projects/Coding Projects/DominionSelector/db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bootstrap = Bootstrap(app)

# c.execute("SELECT * FROM duration")
# print(c.fetchall())
# c.execute("SELECT * FROM terminalDraw")
# print(c.fetchall())
# c.execute("SELECT * FROM sifter")
# print(c.fetchall())
# conn.commit()


def dbconnection():
    conn = sqlite3.connect('cards.db')
    return conn

class Cards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), nullable=False)
    cardSet = db.Column(db.String(50), nullable=False)

class Village(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='village')

class Cantrip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='cantrip')

class Gainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='gainer')

class Sifter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='sifter')

class Trasher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='trasher')

class NonterminalDraw(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='nonterminalDraw')

class TerminalDraw(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='terminalDraw')

class TerminalSilver(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='terminalSilver')

class Action(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='action')

class Attack(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='attack')

class Victory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='victory')

class Treasure(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='treasure')

class Reaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='reaction')

class Duration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cardName = db.Column(db.String(50), db.ForeignKey('cards.cardName'), nullable=False)
    card = db.relationship('Cards', backref='duration')   


@app.route('/')
@app.route('/home')
def home(): 
    
    return render_template ('index.html')

@app.route('/cards')
def cards():

    cardType = request.args.get('cardType')

    print(cardType)

    table_map = {
        'village': Village,
        'cantrip': Cantrip,
        'sifter': Sifter,
        'gainer': Gainer,
        'trasher': Trasher,
        'terminalDraw': TerminalDraw,
        'terminalSilver': TerminalSilver,
        'action': Action,
        'victory': Victory,
        'treasure': Treasure,
        'attack': Attack,
        'reaction': Reaction,
        'duration': Duration
    }

    if cardType in table_map:
        records = table_map[cardType].query.all()
        data = [card.cardName for card in records]

    print(cardType)
    

    return jsonify(data)


    # conn = dbconnection()
    # c = conn.cursor()

    # c.execute("""SELECT DISTINCT cards.name
    #         FROM cards, attack
    #         INNER JOIN action on action.name = cards.name
    #         WHERE attack.name = cards.name;
    #         """)
    # cards = c.fetchall()
    # flatCards = []
    # for card in cards:
    #     flatCards.append(card[0])
    
    # response = jsonify(flatCards)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # return response


# @app.route('/type')
# def inde():
#     conn = dbconnection()
#     c = conn.cursor()

#     cardType = request.args["cardType"]

#     c.execute(f"""SELECT DISTINCT cards.name
#             FROM cards, {cardType}
#             WHERE {cardType}.name = cards.name;
#             """)
#     cards = c.fetchall()
#     flatCards = []
#     for card in cards:
#         flatCards.append(card[0])
    
#     response = jsonify(flatCards)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

    # c.execute("""SELECT cards.name
    #         FROM cards, attack
    #         INNER JOIN duration on duration.name = cards.name
    #         WHERE attack.name = cards.name;
    #         """)
    # data = c.fetchall()
    # return data

#c.execute("SELECT * FROM cards")
#print(c.fetchall())

# c.execute("""SELECT cards.name
#             FROM cards, attack
#             INNER JOIN duration on duration.name = cards.name
#             WHERE attack.name = cards.name;
#             """)
# print(c.fetchall())


# conn.commit()

# c.execute("""SELECT cards.name
#             FROM cards
#             INNER JOIN cardscategories on cardscategories.name = cards.name
#             WHERE cardscategories.category='Cantrip'
#             and cards.gameset='Dominion SE';
#             """)

# print(c.fetchall())

# c.execute("""SELECT cards.name
#             FROM cards
#             INNER JOIN cardstype on cardstype.name = cards.name
#             WHERE cardstype.type='Victory'
#             and cards.gameset='Dominion SE';
#             """)

# print(c.fetchall())


#c.execute("SELECT name FROM sqlite_master WHERE type='table';")
#print(c.fetchall())
#conn.close()