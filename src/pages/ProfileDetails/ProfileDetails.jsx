import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as profileService from '../../services/profileService'
import * as commentService from '../../services/commentService'


const ProfileDetails = (props) => {

  const [profile, setProfile] = useState({})
  const [workouts, setWorkouts] = useState([])
  const [meals, setMeal] = useState([])
  const [form, setForm] = useState({})
  
  const { id } = useParams()

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getProfileDetails(id)
      setProfile(profileData)
      setWorkouts(profileData.workouts)
      setMeal(profileData.meals)
    }
    fetchProfile()
  }, [id])

  const handleChange = (evt) => {
    setForm({...form, [evt.target.name]:evt.target.value})
  }

  
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const updatedProfile = await commentService.create(form, profile._id)
    console.log(updatedProfile)
    setProfile(updatedProfile)
  }
  
  const handleDeleteWorkout = async (id) => {
    await profileService.deleteWorkout(id)
    setWorkouts(workouts.filter((workout) => workout._id !== id))
    }

    const handleDeleteMeal = async (id) => {
      await profileService.deletedMeal(id)
      setMeal(meals.filter((meal) => meal._id !== id))
    }
  return ( 
    <>
      <h1>Profile Details</h1>
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Name: {profile?.name}</h3>
          <h3>{profile?.email}</h3>
            {workouts?.map(workout =>
            <>
              <div className="card">
                <div className="box-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">Muscle: {workout.muscle}</p>
                  {props.user.profile === profile._id ? 
              <>
                <button onClick={() => handleDeleteWorkout(workout._id)} type="button" className="btn btn-danger">Remove</button>
              </>
              : ''
            }
                </div>
              </div>
            </>
            )} 
            {profile.comments?.map(review => {
              <>
                <h1>{review?.author}</h1>
                <h1>{review?.comment}</h1>
              </>
            })}
            {meals?.map(meal =>
            <>
              <div className="card">
                <div className="box-body">
                  <h5 className="card-title">{meal.name}</h5>
                  <p className="card-text">Calories: {meal.calories}</p>
                  <p className="card-text">Protein: {meal.protein_g}g</p>
                  {props.user.profile === profile._id ? 
              <>
                <button onClick={() => handleDeleteMeal(meal._id)} type="button" className="btn btn-danger">Remove</button>
              </>
              : <p></p>
            }
                </div>
              </div>
            </>
            )} 
              {props.user.profile === profile._id ?
            <>
            <p></p>
            </>
            :
            <section>
                <div class="container">
                <h1>Comments</h1>
                  {/* <div class="comment mt-4 text-justify float-left">
                    <img src="https://i.imgur.com/yTFUilP.jpg" alt="" class="rounded-circle" width="40" height="40"/>
                    <h4>Jhon Doe</h4>
                    <span>- 20 October, 2018</span>
                    <br/>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                  </div> */}
                  {/* <div class="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4"> */}
                <form id="algin-form" onSubmit={handleSubmit}>
                  <div class="form-group">
                    <h4>Leave a comment</h4>
                    <label for="message">Message</label>
                    <textarea type="text" onChange={handleChange} name="comment" value={form.comment} id=""msg cols="30" rows="5" class="form-control" ></textarea>
                  </div>
                  <div class="form-group">
                    <button type="submit" id="post" class="btn">Post Comment</button>
                  </div>
                </form>
              </div>
            </section>
            }
        </div>
      </div>
    </>
  );
}

export default ProfileDetails