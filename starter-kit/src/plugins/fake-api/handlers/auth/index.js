import { HttpResponse, http } from 'msw'

// Handlers for auth
export const handlerAuth = [
  http.post(('/api/auth/login'), async ({ request }) => {
    const { data } = await request.json()
    let errors = {
      username: ['Something went wrong'],
    }
    
    if (data) {
      try {
  
        // We are duplicating user here
        const userData = { ...data }

        const userOutData = Object.fromEntries(Object.entries(userData)
          .filter(([key, _]) => !(key === 'abilityRules')))

        const response = {
          userAbilityRules: userData.abilityRules,
          userData: userOutData,
        }

        return HttpResponse.json(response, { status: 201 })
      }
      catch (e) {
        errors = { username: [e] }
      }
    }
    else {
      errors = { username: ['Invalid email or password'] }
    }
    
    return HttpResponse.json({ errors }, { status: 400 })
  }),
]
