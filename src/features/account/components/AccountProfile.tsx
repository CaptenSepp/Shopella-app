"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Camera, Mail, MapPin, Phone, UserRound } from "lucide-react"
import { useSelector } from "react-redux"
import { useAppDispatch, type RootState } from "@/app/store"
import { setUser } from "@/features/auth/authSlice"

type ProfileDetails = {
  name: string
  email: string
  phone: string
  address: string
}

const AccountProfile = () => {
  // The authenticated user identifies the browser-local profile record.
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useAppDispatch()
  const storageKey = user ? `shopella-account-profile:${user.id}` : ""
  const [profile, setProfile] = useState<ProfileDetails | null>(null)
  const [draft, setDraft] = useState<ProfileDetails | null>(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    // Merge optional saved contact details over the current authentication identity.
    if (!user) return
    let saved: Partial<ProfileDetails> = {}
    try {
      saved = JSON.parse(localStorage.getItem(storageKey) ?? "{}") as Partial<ProfileDetails>
    } catch {
      saved = {}
    }
    const details = { name: user.name, email: user.email, phone: "", address: "", ...saved }
    setProfile(details)
    setDraft(details)
  }, [storageKey, user])

  if (!user || !profile || !draft) return null

  const save = (event: FormEvent) => {
    // Persist the editable draft and mirror identity fields back into Redux.
    event.preventDefault()
    const nextProfile = {
      name: draft.name.trim(),
      email: draft.email.trim().toLowerCase(),
      phone: draft.phone.trim(),
      address: draft.address.trim(),
    }
    if (!nextProfile.name || !nextProfile.email) return
    localStorage.setItem(storageKey, JSON.stringify(nextProfile))
    setProfile(nextProfile)
    setDraft(nextProfile)
    dispatch(setUser({ ...user, name: nextProfile.name, email: nextProfile.email }))
    setEditing(false)
  }

  const initials = profile.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()

  return (
    <section className="account-profile surface-card" aria-labelledby="account-profile-title">
      <header className="account-profile__header">
        <div className="account-profile__avatar" aria-label="Profile picture placeholder">
          <span>{initials || <UserRound aria-hidden="true" />}</span>
          <Camera className="account-profile__camera" aria-hidden="true" />
        </div>
        <div>
          <p className="account-profile__eyebrow">Personal account</p>
          <h1 id="account-profile-title">{profile.name}</h1>
          <p>Manage your contact and delivery information.</p>
        </div>
        {!editing ? <button className="btn btn-secondary" type="button" onClick={() => setEditing(true)}>Edit profile</button> : null}
      </header>

      <form className="account-profile__details" onSubmit={save}>
        {/* Read-only fields become controlled inputs while the profile is being edited. */}
        <label>
          <span><UserRound aria-hidden="true" /> Name</span>
          <input className="input-field" value={draft.name} readOnly={!editing} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
        </label>
        <label>
          <span><Mail aria-hidden="true" /> Email</span>
          <input className="input-field" type="email" value={draft.email} readOnly={!editing} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
        </label>
        <label>
          <span><Phone aria-hidden="true" /> Phone</span>
          <input className="input-field" type="tel" value={draft.phone} readOnly={!editing} placeholder={editing ? "Add phone number" : ""} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
        </label>
        <label>
          <span><MapPin aria-hidden="true" /> Delivery address</span>
          <input className="input-field" value={draft.address} readOnly={!editing} placeholder={editing ? "Add delivery address" : ""} onChange={(event) => setDraft({ ...draft, address: event.target.value })} />
        </label>
        {editing ? (
          // Cancel restores the last saved profile rather than the partially edited draft.
          <div className="account-profile__actions">
            <button className="btn btn-primary" type="submit">Save changes</button>
            <button className="btn btn-secondary" type="button" onClick={() => { setDraft(profile); setEditing(false) }}>Cancel</button>
          </div>
        ) : null}
      </form>
      <p className="account-profile__note">Demo profile changes are stored only in this browser and do not change sign-in credentials.</p>
    </section>
  )
}

export default AccountProfile
