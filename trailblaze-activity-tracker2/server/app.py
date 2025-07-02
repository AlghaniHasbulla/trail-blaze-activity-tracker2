from flask import Flask, jsonify, request
from flask_cors import CORS
from .models import db, Location, User, Review
from .config import DevelopmentConfig

# Initialize app
app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

# Enable CORS
CORS(app)

# Initialize database
db.init_app(app)

# Root route (health check)
@app.route('/')
def index():
    return jsonify({"message": "TrailBlaze API is running!"})

# Get all locations
@app.route('/locations', methods=['GET'])
def get_locations():
    locations = Location.query.all()
    return jsonify([{
        'id': l.id,
        'name': l.name,
        'address': l.address,
        'type': l.type,
        'description': l.description,
        'average_rating': round(sum([r.rating for r in l.reviews]) / len(l.reviews), 1) if l.reviews else None
    } for l in locations])

# Get and create reviews
@app.route('/reviews', methods=['GET', 'POST'])
def handle_reviews():
    if request.method == 'GET':
        reviews = Review.query.all()
        return jsonify([{
            'id': r.id,
            'rating': r.rating,
            'comment': r.comment,
            'user_id': r.user_id,
            'location_id': r.location_id
        } for r in reviews])

    elif request.method == 'POST':
        data = request.get_json()
        review = Review(
            rating=data['rating'],
            comment=data['comment'],
            user_id=data['user_id'],
            location_id=data['location_id']
        )
        db.session.add(review)
        db.session.commit()
        return jsonify({'message': 'Review created'}), 201

# Get, update, delete review by ID
@app.route('/reviews/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_review(id):
    review = Review.query.get_or_404(id)

    if request.method == 'GET':
        return jsonify({
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'user_id': review.user_id,
            'location_id': review.location_id
        })

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            setattr(review, key, value)
        db.session.commit()
        return jsonify({'message': 'Review updated'})

    elif request.method == 'DELETE':
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review deleted'})

# Entry point
if __name__ == '__main__':
    app.run(debug=True)