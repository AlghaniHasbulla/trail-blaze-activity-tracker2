from server.app import app
from server.models import db, Location, User, Review

with app.app_context():
    print("Clearing existing data...")
    Review.query.delete()
    Location.query.delete()
    User.query.delete()

    print("Seeding users...")
    user1 = User(username='skate_sam', bio='Skates daily!', avatar_url='https://picsum.photos/id/237/200/200')
    user2 = User(username='bike_ben', bio='Bike mechanic and adventurer', avatar_url='https://picsum.photos/id/227/200/200')
    db.session.add_all([user1, user2])
    db.session.commit()

    print("Seeding locations...")
    loc1 = Location(name='Downtown Skate Park', address='123 Main St', type='skate', description='Great for tricks and ramps.')
    loc2 = Location(name='River Trail Bike Path', address='456 River Rd', type='bike', description='Scenic trail good for all skill levels.')
    loc3 = Location(name='Community Mural Wall', address='789 Art Ln', type='art', description='Public wall for muralists.')
    loc4 = Location(name='Neighborhood Court', address='321 Bounce St', type='court', description='Full court for hoops and soccer.')
    loc5 = Location(name='Forest Bike Jump Area', address='654 Dirt Rd', type='bike', description='Advanced dirt jumps under the trees.')

    db.session.add_all([loc1, loc2, loc3, loc4, loc5])
    db.session.commit()

    print("Done seeding data successfully!")
